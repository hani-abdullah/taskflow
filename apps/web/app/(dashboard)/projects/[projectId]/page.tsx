'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  Add,
  Search,
} from '@mui/icons-material';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createTask,
  deleteTask,
  getTasks,
  Task,
  TaskPriority,
  TaskStatus,
  updateTask,
} from '@/features/tasks/api';

import {
  TaskDialog,
} from '@/features/tasks/components/task-dialog';

import {
  TaskColumn,
} from '@/features/tasks/components/task-column';

import type {
  TaskFormData,
} from '@/features/tasks/schemas';

export default function ProjectIdPage() {
  const params = useParams();

  const projectId =
    params.projectId as string;

  const queryClient =
    useQueryClient();

  /*
   * --------------------------------------------------
   * LOCAL STATE
   * --------------------------------------------------
   */

  const [search, setSearch] =
    useState('');

  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState<
    'ALL' | TaskPriority
  >('ALL');

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [defaultStatus, setDefaultStatus] =
    useState<TaskStatus>('TODO');

  /*
   * --------------------------------------------------
   * GET TASKS
   * --------------------------------------------------
   */

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Task[]>({
    queryKey: [
      'tasks',
      projectId,
    ],

    queryFn: () =>
      getTasks(projectId),

    enabled: Boolean(projectId),
  });

  /*
   * --------------------------------------------------
   * FILTER TASKS
   * --------------------------------------------------
   */

  const filteredTasks =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return tasks.filter(
        (task) => {
          /*
           * Search title
           */
          const matchesTitle =
            task.title
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          /*
           * Search description
           */
          const matchesDescription =
            task.description
              ?.toLowerCase()
              .includes(
                normalizedSearch,
              ) ?? false;

          /*
           * If search is empty,
           * everything matches.
           */
          const matchesSearch =
            normalizedSearch.length ===
              0 ||
            matchesTitle ||
            matchesDescription;

          /*
           * Priority filter
           */
          const matchesPriority =
            priorityFilter ===
              'ALL' ||
            task.priority ===
              priorityFilter;

          return (
            matchesSearch &&
            matchesPriority
          );
        },
      );
    }, [
      tasks,
      search,
      priorityFilter,
    ]);

  /*
   * --------------------------------------------------
   * CREATE TASK
   * --------------------------------------------------
   */

  const createMutation =
    useMutation({
      mutationFn: createTask,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              'tasks',
              projectId,
            ],
          },
        );

        setDialogOpen(false);
        setEditingTask(null);
      },
    });

  /*
   * --------------------------------------------------
   * UPDATE TASK
   * --------------------------------------------------
   */

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: Parameters<
          typeof updateTask
        >[1];
      }) =>
        updateTask(id, data),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              'tasks',
              projectId,
            ],
          },
        );

        setDialogOpen(false);
        setEditingTask(null);
      },
    });

  /*
   * --------------------------------------------------
   * DELETE TASK
   * --------------------------------------------------
   */

  const deleteMutation =
    useMutation({
      mutationFn: deleteTask,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              'tasks',
              projectId,
            ],
          },
        );
      },
    });

  /*
   * --------------------------------------------------
   * OPTIMISTIC STATUS UPDATE
   * --------------------------------------------------
   */

  const updateStatusMutation =
    useMutation({
      mutationFn: ({
        id,
        status,
      }: {
        id: string;
        status: TaskStatus;
      }) =>
        updateTask(id, {
          status,
        }),

      /*
       * Before request
       */
      onMutate: async ({
        id,
        status,
      }) => {
        /*
         * Cancel currently running
         * task requests.
         */
        await queryClient.cancelQueries(
          {
            queryKey: [
              'tasks',
              projectId,
            ],
          },
        );

        /*
         * Save current state.
         *
         * If API fails, we restore this.
         */
        const previousTasks =
          queryClient.getQueryData<Task[]>(
            [
              'tasks',
              projectId,
            ],
          );

        /*
         * Update UI immediately.
         */
        queryClient.setQueryData<Task[]>(
          [
            'tasks',
            projectId,
          ],
          (currentTasks) => {
            if (!currentTasks) {
              return currentTasks;
            }

            return currentTasks.map(
              (task) => {
                if (
                  task.id !== id
                ) {
                  return task;
                }

                return {
                  ...task,
                  status,
                };
              },
            );
          },
        );

        return {
          previousTasks,
        };
      },

      /*
       * API failed
       */
      onError: (
        _error,
        _variables,
        context,
      ) => {
        if (
          context?.previousTasks
        ) {
          queryClient.setQueryData(
            [
              'tasks',
              projectId,
            ],
            context.previousTasks,
          );
        }
      },

      /*
       * API finished.
       *
       * Re-fetch the authoritative
       * server state.
       */
      onSettled: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              'tasks',
              projectId,
            ],
          },
        );
      },
    });

  /*
   * --------------------------------------------------
   * CREATE BUTTON
   * --------------------------------------------------
   */

  const handleCreate = (
    status: TaskStatus = 'TODO',
  ) => {
    setEditingTask(null);

    setDefaultStatus(status);

    setDialogOpen(true);
  };

  /*
   * --------------------------------------------------
   * EDIT BUTTON
   * --------------------------------------------------
   */

  const handleEdit = (
    task: Task,
  ) => {
    setEditingTask(task);

    setDefaultStatus(task.status);

    setDialogOpen(true);
  };

  /*
   * --------------------------------------------------
   * SUBMIT TASK FORM
   * --------------------------------------------------
   */

  const handleSubmit = (
    data: TaskFormData,
  ) => {
    /*
     * EDIT
     */
    if (editingTask) {
      updateMutation.mutate({
        id: editingTask.id,

        data: {
          title: data.title,

          description:
            data.description ||
            undefined,

          priority:
            data.priority,

          dueDate:
            data.dueDate ||
            undefined,

          assigneeId:
            data.assigneeId ||
            null,
        },
      });

      return;
    }

    /*
     * CREATE
     */
    createMutation.mutate({
      title: data.title,

      description:
        data.description ||
        undefined,

      priority:
        data.priority,

      dueDate:
        data.dueDate ||
        undefined,

      assigneeId:
        data.assigneeId ||
        undefined,

      projectId,

      status: defaultStatus,
    });
  };

  /*
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  const handleDelete = (
    task: Task,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${task.title}"?`,
      );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(
      task.id,
    );
  };

  /*
   * --------------------------------------------------
   * CHANGE STATUS
   * --------------------------------------------------
   */

  const handleStatusChange = (
    task: Task,
    status: TaskStatus,
  ) => {
    /*
     * Same status = nothing to do.
     */
    if (task.status === status) {
      return;
    }

    updateStatusMutation.mutate({
      id: task.id,
      status,
    });
  };

  /*
   * --------------------------------------------------
   * CLOSE DIALOG
   * --------------------------------------------------
   */

  const handleDialogClose = () => {
    /*
     * Don't allow closing while
     * create/update is running.
     */
    if (
      createMutation.isPending ||
      updateMutation.isPending
    ) {
      return;
    }

    setDialogOpen(false);

    setEditingTask(null);
  };

  /*
   * --------------------------------------------------
   * LOADING
   * --------------------------------------------------
   */

  if (isLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          py: 6,
        }}
      >
        <Box
          sx={{
            minHeight: 400,

            display: 'grid',

            placeItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  /*
   * --------------------------------------------------
   * ERROR
   * --------------------------------------------------
   */

  if (isError) {
    return (
      <Container
        maxWidth={false}
        sx={{
          py: 6,
        }}
      >
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Failed to load tasks.'}
        </Alert>
      </Container>
    );
  }

  /*
   * --------------------------------------------------
   * COUNTS
   * --------------------------------------------------
   */

  const todoCount =
    filteredTasks.filter(
      (task) =>
        task.status ===
        'TODO',
    ).length;

  const inProgressCount =
    filteredTasks.filter(
      (task) =>
        task.status ===
        'IN_PROGRESS',
    ).length;

  const doneCount =
    filteredTasks.filter(
      (task) =>
        task.status ===
        'DONE',
    ).length;

  const isFiltering =
    search.trim().length > 0 ||
    priorityFilter !== 'ALL';

  /*
   * --------------------------------------------------
   * PAGE
   * --------------------------------------------------
   */

  return (
    <Container
      maxWidth={false}
      sx={{
        py: {
          xs: 3,
          md: 4,
        },
      }}
    >
      <Stack spacing={4}>
        {/* ==========================================
            HEADER
        =========================================== */}

        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              md: "center",
            },
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },
                fontWeight: 700,
              }}
            >
              Project
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Manage your project
              tasks.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() =>
              handleCreate('TODO')
            }
          >
            New task
          </Button>
        </Stack>

        {/* ==========================================
            SEARCH + FILTER
        =========================================== */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          {/* SEARCH */}

          <TextField
            fullWidth
            size="small"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            slotProps={{
              input: {
                startAdornment: (
                  <Search
                    sx={{
                      mr: 1,

                      color:
                        'text.secondary',
                    }}
                  />
                ),
              },
            }}
          />

          {/* PRIORITY */}

          <TextField
            select
            size="small"
            label="Priority"
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target
                  .value as
                  | 'ALL'
                  | TaskPriority,
              )
            }
            sx={{
              width: {
                xs: '100%',
                sm: 190,
              },
            }}
          >
            <MenuItem value="ALL">
              All priorities
            </MenuItem>

            <MenuItem value="LOW">
              Low
            </MenuItem>

            <MenuItem value="MEDIUM">
              Medium
            </MenuItem>

            <MenuItem value="HIGH">
              High
            </MenuItem>
          </TextField>
        </Stack>

        {/* ==========================================
            FILTER INFO
        =========================================== */}

        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {isFiltering
              ? `Showing ${filteredTasks.length} of ${tasks.length} tasks`
              : `${tasks.length} total task${
                  tasks.length === 1
                    ? ''
                    : 's'
                }`}
          </Typography>

          {isFiltering && (
            <Button
              size="small"
              onClick={() => {
                setSearch('');
                setPriorityFilter(
                  'ALL',
                );
              }}
            >
              Clear filters
            </Button>
          )}
        </Stack>

        {/* ==========================================
            BOARD
        =========================================== */}

        <Box
          sx={{
            width: '100%',

            overflowX: 'auto',

            pb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',

              gap: {
                xs: 2,
                md: 3,
              },

              alignItems:
                'flex-start',

              minWidth: 'max-content',
            }}
          >
            {/* TODO */}

            <TaskColumn
              title="To do"
              status="TODO"
              tasks={filteredTasks.filter(
                (task) =>
                  task.status ===
                  'TODO',
              )}
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={
                handleDelete
              }
              onStatusChange={
                handleStatusChange
              }
            />

            {/* IN PROGRESS */}

            <TaskColumn
              title="In progress"
              status="IN_PROGRESS"
              tasks={filteredTasks.filter(
                (task) =>
                  task.status ===
                  'IN_PROGRESS',
              )}
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={
                handleDelete
              }
              onStatusChange={
                handleStatusChange
              }
            />

            {/* DONE */}

            <TaskColumn
              title="Done"
              status="DONE"
              tasks={filteredTasks.filter(
                (task) =>
                  task.status ===
                  'DONE',
              )}
              onAdd={handleCreate}
              onEdit={handleEdit}
              onDelete={
                handleDelete
              }
              onStatusChange={
                handleStatusChange
              }
            />
          </Box>
        </Box>

        {/* ==========================================
            NO SEARCH RESULTS
        =========================================== */}

        {isFiltering &&
          filteredTasks.length ===
            0 && (
            <Alert
              severity="info"
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSearch('');
                    setPriorityFilter(
                      'ALL',
                    );
                  }}
                >
                  Clear
                </Button>
              }
            >
              No tasks match your
              search or filter.
            </Alert>
          )}

        {/* ==========================================
            BOARD SUMMARY
        =========================================== */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            To do: {todoCount}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            In progress:{' '}
            {inProgressCount}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Done: {doneCount}
          </Typography>
        </Stack>
      </Stack>

      {/* ==========================================
          TASK DIALOG
      =========================================== */}

      <TaskDialog
        open={dialogOpen}
        task={editingTask}
        loading={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onClose={
          handleDialogClose
        }
        onSubmit={handleSubmit}
      />

      {/* ==========================================
          MUTATION ERRORS
      =========================================== */}

      {(createMutation.isError ||
        updateMutation.isError ||
        deleteMutation.isError ||
        updateStatusMutation.isError) && (
        <Alert
          severity="error"
          sx={{
            position: 'fixed',

            bottom: 24,

            right: 24,

            zIndex: 2000,

            maxWidth: 420,
          }}
        >
          {createMutation.error
            ?.message ||
            updateMutation.error
              ?.message ||
            deleteMutation.error
              ?.message ||
            updateStatusMutation
              .error?.message ||
            'Something went wrong.'}
        </Alert>
      )}
    </Container>
  );
}

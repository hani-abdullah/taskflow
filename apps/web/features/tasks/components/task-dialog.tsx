'use client';

import {
  useEffect,
} from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';

import {
  Task,
} from '../api';

import {
  taskSchema,
  TaskFormData,
} from '../schemas';
import { getUsers } from '@/features/users/api';

interface Props {
  open: boolean;

  task?: Task | null;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    data: TaskFormData,
  ) => void;
}

export function TaskDialog({
  open,
  task,
  loading = false,
  onClose,
  onSubmit,
}: Props) {
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: open,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<TaskFormData>({
    resolver:
      zodResolver(taskSchema),

    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
      assigneeId: '',
    },
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    reset({
      title: task?.title ?? '',

      description:
        task?.description ?? '',

      priority:
        task?.priority ?? 'MEDIUM',

      dueDate: task?.dueDate
        ? task.dueDate.slice(
            0,
            10,
          )
        : '',

      assigneeId: task?.assigneeId ?? '',
    });
  }, [
    task,
    open,
    reset,
  ]);

  const handleClose = () => {
    if (loading) {
      return;
    }

    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {task
          ? 'Edit task'
          : 'Create task'}
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ pt: 1 }}
        >
          <TextField
            autoFocus
            label="Title"
            fullWidth
            {...register('title')}
            error={
              !!errors.title
            }
            helperText={
              errors.title?.message
            }
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            {...register(
              'description',
            )}
            error={
              !!errors.description
            }
            helperText={
              errors.description?.message
            }
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Priority"
                fullWidth
                {...field}
                value={field.value ?? 'MEDIUM'}
                error={!!errors.priority}
                helperText={errors.priority?.message}
              >
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
            )}
          />

          <Controller
            name="assigneeId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Assignee"
                fullWidth
                {...field}
                value={field.value ?? ''}
                disabled={usersLoading}
                helperText={usersLoading ? 'Loading users...' : undefined}
              >
                <MenuItem value="">
                  Unassigned
                </MenuItem>

                {users.map((user) => {
                  const fullName = `${user.firstName} ${user.lastName}`.trim();

                  return (
                    <MenuItem key={user.id} value={user.id}>
                      {fullName || user.email} ({user.email})
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />

          <TextField
            label="Due date"
            type="date"
            fullWidth
            slotProps={{
                inputLabel: {
                    shrink: true,
                }
            }}
            {...register(
              'dueDate',
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(
            onSubmit,
          )}
        >
          {loading
            ? 'Saving...'
            : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

'use client';

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import {
  Add,
} from '@mui/icons-material';

import {
  Task,
  TaskStatus,
} from '../api';

import {
  TaskCard,
} from './task-card';

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];

  onAdd: (
    status: TaskStatus,
  ) => void;

  onEdit: (
    task: Task,
  ) => void;

  onDelete: (
    task: Task,
  ) => void;

  onStatusChange: (
    task: Task,
    status: TaskStatus,
  ) => void;
}

export function TaskColumn({
  title,
  status,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <Box
      sx={{
        minWidth: {
          xs: 280,
          sm: 320,
        },
        width: {
          xs: 280,
          sm: 320,
        },
        flexShrink: 0,
      }}
    >
      <Stack spacing={2}>
        {/* COLUMN HEADER */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
                alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{fontWeight: 600}}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {tasks.length}
            </Typography>
          </Stack>

          <Button
            size="small"
            startIcon={<Add />}
            onClick={() =>
              onAdd(status)
            }
          >
            Add
          </Button>
        </Stack>

        <Divider />

        {/* TASKS */}
        <Stack spacing={2}>
          {tasks.length === 0 ? (
            <Box
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px dashed',
                borderColor:
                  'divider',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
              >
                No tasks
              </Typography>

              <Button
                size="small"
                startIcon={<Add />}
                sx={{ mt: 1 }}
                onClick={() =>
                  onAdd(status)
                }
              >
                Add task
              </Button>
            </Box>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={
                  onStatusChange
                }
              />
            ))
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
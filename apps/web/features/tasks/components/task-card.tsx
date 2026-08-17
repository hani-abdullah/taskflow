'use client';

import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  Delete,
  Edit,
} from '@mui/icons-material';

import {
  Task,
  TaskStatus,
} from '../api';

interface Props {
  task: Task;

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

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* TITLE + ACTIONS */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                wordBreak: 'break-word',
                fontWeight: 600,
              }}
            >
              {task.title}
            </Typography>

            <Stack
              direction="row"
              sx={{
                flexShrink: 0,
              }}
            >
              <IconButton
                size="small"
                onClick={() =>
                  onEdit(task)
                }
              >
                <Edit fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                onClick={() =>
                  onDelete(task)
                }
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* DESCRIPTION */}
          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                wordBreak: 'break-word',
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* META */}
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
                flewWrap: 'wrap',
            }}
          >
            <Chip
              size="small"
              label={task.priority}
            />

            {task.dueDate && (
              <Chip
                size="small"
                variant="outlined"
                label={`Due ${task.dueDate.slice(
                  0,
                  10,
                )}`}
              />
            )}

            {task.assignee && (
              <Chip
                size="small"
                variant="outlined"
                label={
                  task.assignee.firstName
                    ? `${task.assignee.firstName} ${task.assignee.lastName ?? ''}`
                    : task.assignee.email
                }
              />
            )}
          </Stack>

          {/* STATUS ACTIONS */}
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
                flexWrap: 'wrap',
            }}
          >
            {task.status !==
              'TODO' && (
              <Button
                size="small"
                variant="text"
                onClick={() =>
                  onStatusChange(
                    task,
                    'TODO',
                  )
                }
              >
                To do
              </Button>
            )}

            {task.status !==
              'IN_PROGRESS' && (
              <Button
                size="small"
                variant="text"
                onClick={() =>
                  onStatusChange(
                    task,
                    'IN_PROGRESS',
                  )
                }
              >
                Start
              </Button>
            )}

            {task.status !==
              'DONE' && (
              <Button
                size="small"
                variant="text"
                onClick={() =>
                  onStatusChange(
                    task,
                    'DONE',
                  )
                }
              >
                Done
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
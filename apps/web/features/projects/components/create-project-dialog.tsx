'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import {
  useEffect,
} from 'react';

import {
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';

import {
  z,
} from 'zod';

const schema =
  z.object({
    name: z
      .string()
      .min(
        1,
        'Name is required',
      )
      .max(100),

    description: z
      .string()
      .max(1000)
      .optional(),
  });

export type CreateProjectFormData =
  z.infer<typeof schema>;

interface Props {
  open: boolean;

  loading?: boolean;

  onClose: () => void;

  onSubmit: (
    data: CreateProjectFormData,
  ) => void;
}

export function CreateProjectDialog({
  open,
  loading = false,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<CreateProjectFormData>({
    resolver:
      zodResolver(schema),

    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [
    open,
    reset,
  ]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (!loading) {
          onClose();
        }
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Create project
      </DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          sx={{ pt: 1 }}
        >
          <TextField
            autoFocus
            label="Name"
            fullWidth
            {...register('name')}
            error={
              !!errors.name
            }
            helperText={
              errors.name?.message
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
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
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
            ? 'Creating...'
            : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
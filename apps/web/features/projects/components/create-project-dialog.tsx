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
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100),

  description: z
    .string()
    .max(1000)
    .optional(),
});

type FormData =
  z.infer<typeof schema>;

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (
    data: FormData,
  ) => void;
}

export function CreateProjectDialog({
  open,
  loading,
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
  } = useForm<FormData>({
    resolver:
      zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const close = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
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
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={
              errors.name?.message
            }
          />

          <TextField
            label="Description"
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
        <Button onClick={close}>
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(
            (data) => {
              onSubmit(data);
              reset();
            },
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
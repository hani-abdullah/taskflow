'use client';

import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createProject,
  getProjects,
} from '@/features/projects/api';

import { useState } from 'react';

import { CreateProjectDialog } from '@/features/projects/components/create-project-dialog';

export default function ProjectsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  // Get projects
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  // Create project mutation
  const createMutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      // Refresh projects after creating one
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      // Close dialog
      setDialogOpen(false);
    },
  });

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">
          Failed to load projects.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3">
              Projects
            </Typography>

            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
            >
              New project
            </Button>
          </Stack>

          {/* Projects */}
          <Grid container spacing={3}>
            {data?.map((project) => (
              <Grid
                key={project.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {project.name}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {project.description ||
                        'No description'}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ mt: 2 }}
                    >
                      Tasks:{' '}
                      {project._count?.tasks ?? 0}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={dialogOpen}
        loading={createMutation.isPending}
        onClose={() => setDialogOpen(false)}
        onSubmit={(formData) => {
          createMutation.mutate(formData);
        }}
      />

      {/* Create error */}
      {createMutation.isError && (
        <Alert
          severity="error"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
        >
          Failed to create project.
        </Alert>
      )}
    </>
  );
}
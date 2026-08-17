'use client';

import {
  useState,
} from 'react';

import Link from 'next/link';

import {
  Alert,
  Box,
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
  Add,
  ArrowForward,
} from '@mui/icons-material';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createProject,
  getProjects,
} from '@/features/projects/api';

import {
  CreateProjectDialog,
  CreateProjectFormData,
} from '@/features/projects/components/create-project-dialog';

export default function ProjectsPage() {
  const queryClient =
    useQueryClient();

  const [
    dialogOpen,
    setDialogOpen,
  ] = useState(false);

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const createMutation =
    useMutation({
      mutationFn: createProject,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              'projects',
            ],
          },
        );

        setDialogOpen(false);
      },
    });

  const handleCreate = (
    data: CreateProjectFormData,
  ) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            minHeight: 300,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 6 }}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Failed to load projects.'}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ py: 6 }}>
        <Stack spacing={4}>
          {/* HEADER */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            sx={{
              justifyContent: 'space-between',
              alignItems: {
                xs: 'stretch',
                sm: 'center',
              },
            }}
            spacing={2}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{fontWeight: 700}}
              >
                Projects
              </Typography>

              <Typography
                color="text.secondary"
              >
                Manage your projects
                and tasks.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() =>
                setDialogOpen(true)
              }
            >
              New project
            </Button>
          </Stack>

          {/* EMPTY */}
          {projects.length === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Stack
                  spacing={2}
                  sx={{ py: 6, alignItems: 'center' }}
                >
                  <Typography
                    variant="h6"
                  >
                    No projects yet
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{textAlign: "center", alignItems: 'center'}}
                  >
                    Create your first
                    project to get
                    started.
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={
                      <Add />
                    }
                    onClick={() =>
                      setDialogOpen(
                        true,
                      )
                    }
                  >
                    Create project
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {projects.map(
                (project) => (
                  <Grid
                    key={project.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height:
                          '100%',
                      }}
                    >
                      <CardContent>
                        <Stack
                          spacing={2}
                          sx={{
                            height:
                              '100%',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{fontWeight: 600}}
                            >
                              {
                                project.name
                              }
                            </Typography>

                            <Typography
                              color="text.secondary"
                              sx={{
                                mt: 1,
                              }}
                            >
                              {project.description ||
                                'No description'}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              flex: 1,
                            }}
                          />

                          <Stack
                            direction="row"
                            sx={{
                              jstifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Tasks:{' '}
                              {project
                                ._count
                                ?.tasks ??
                                0}
                            </Typography>

                            <Button
                              component={
                                Link
                              }
                              href={`/projects/${project.id}`}
                              size="small"
                              endIcon={
                                <ArrowForward />
                              }
                            >
                              Open
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ),
              )}
            </Grid>
          )}
        </Stack>
      </Container>

      <CreateProjectDialog
        open={dialogOpen}
        loading={
          createMutation.isPending
        }
        onClose={() =>
          setDialogOpen(false)
        }
        onSubmit={handleCreate}
      />
    </>
  );
}
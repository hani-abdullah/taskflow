'use client';

import {
  useState,
} from 'react';

import {
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import {
  Notifications,
} from '@mui/icons-material';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getUnreadCount,
  getUnreadNotifications,
  markNotificationAsRead,
} from '../api';

export function NotificationBell() {
  const queryClient =
    useQueryClient();

  const [
    anchorEl,
    setAnchorEl,
  ] = useState<
    HTMLElement | null
  >(null);

  const {
    data: count = 0,
  } = useQuery({
    queryKey: [
      'notifications',
      'unread-count',
    ],

    queryFn:
      getUnreadCount,

    refetchInterval:
      30_000,
  });

  const {
    data: notifications = [],
  } = useQuery({
    queryKey: [
      'notifications',
      'unread',
    ],

    queryFn:
      getUnreadNotifications,

    enabled: Boolean(anchorEl),
  });

  const markReadMutation =
    useMutation({
      mutationFn:
        markNotificationAsRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'notifications',
          ],
        });
      },
    });

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={(event) =>
          setAnchorEl(
            event.currentTarget,
          )
        }
      >
        <Badge
          badgeContent={count}
          color="error"
        >
          <Notifications />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() =>
          setAnchorEl(null)
        }
        slotProps={{
          paper: {
            sx: {
              width: 360,
              maxWidth: 'calc(100vw - 32px)',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
          sx={{fontWeight: 700}}
          >
            Notifications
          </Typography>
        </Box>

        <Divider />

        {notifications.length ===
        0 ? (
          <MenuItem disabled>
            No new notifications
          </MenuItem>
        ) : (
          notifications.map(
            (notification) => (
              <MenuItem
                key={
                  notification.id
                }
                onClick={() => {
                  markReadMutation.mutate(
                    notification.id,
                  );
                }}
                sx={{
                  whiteSpace:
                    'normal',
                }}
              >
                <Stack spacing={0.5}>
                  <Typography
                    sx={{fontWeight: 600}}
                  >
                    {
                      notification.title
                    }
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {
                      notification.message
                    }
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {new Date(
                      notification.createdAt,
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </MenuItem>
            ),
          )
        )}
      </Menu>
    </>
  );
}
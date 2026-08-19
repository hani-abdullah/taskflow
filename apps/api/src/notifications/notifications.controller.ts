import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiTags('Notifications')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all notifications' })
  @ApiOkResponse({ schema: { type: 'array', items: { type: 'object' }, example: [{ id: 'cm123notification', type: 'TASK_ASSIGNED', title: 'New task', message: 'You were assigned a task.', readAt: null }] } })
  findAll(@CurrentUser() user: { id: string }) {
    return this.notificationsService.findAll(user.id);
  }

  @Get('unread')
  @ApiOperation({ summary: 'List unread notifications' })
  @ApiOkResponse({ schema: { type: 'array', items: { type: 'object' } } })
  findUnread(@CurrentUser() user: { id: string }) {
    return this.notificationsService.findUnread(user.id);
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Count unread notifications' })
  @ApiOkResponse({ schema: { example: { count: 3 } } })
  unreadCount(@CurrentUser() user: { id: string }) {
    return this.notificationsService.unreadCount(user.id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark every notification as read' })
  @ApiOkResponse({ schema: { example: { count: 3 } } })
  markAllAsRead(@CurrentUser() user: { id: string }) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark one notification as read' })
  @ApiParam({ name: 'id', example: 'cm123notification' })
  @ApiOkResponse({ schema: { example: { id: 'cm123notification', readAt: '2026-08-19T10:30:00.000Z' } } })
  @ApiNotFoundResponse({ description: 'Notification not found.' })
  markAsRead(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.notificationsService.markAsRead(user.id, id);
  }
}

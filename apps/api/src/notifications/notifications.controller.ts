import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user: { id: string }) {
    return this.notificationsService.findAll(user.id);
  }

  @Get('unread')
  findUnread(@CurrentUser() user: { id: string }) {
    return this.notificationsService.findUnread(user.id);
  }

  @Get('unread/count')
  unreadCount(@CurrentUser() user: { id: string }) {
    return this.notificationsService.unreadCount(user.id);
  }

  @Patch('read-all')
  markAllAsRead(@CurrentUser() user: { id: string }) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Patch(':id/read')
  markAsRead(@CurrentUser() user: { id: string }, @Param('id') id: string) {
    return this.notificationsService.markAsRead(user.id, id);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users available for assignment' })
  @ApiOkResponse({ schema: { type: 'array', items: { type: 'object' }, example: [{ id: 'cm123user', email: 'alex@taskflow.app', firstName: 'Alex', lastName: 'Morgan' }] } })
  findAll() {
    return this.usersService.findAll();
  }
}

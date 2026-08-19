import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SubscriptionGuard } from './subscription.guard';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('billing')
@ApiTags('Billing')
export class BillingController {
  @Get('premium')
  @UseGuards(JwtAuthGuard, SubscriptionGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Check access to a premium feature' })
  @ApiOkResponse({ schema: { example: { enabled: true } } })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
  @ApiForbiddenResponse({ description: 'An active subscription is required.' })
  premiumFeature() {
    return { enabled: true };
  }
}

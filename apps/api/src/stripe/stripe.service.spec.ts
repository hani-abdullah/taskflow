import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';

describe('StripeService', () => {
  const webhookSecret = 'whsec_test_secret';
  let service: StripeService;

  beforeEach(() => {
    const values: Record<string, string> = {
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_WEBHOOK_SECRET: webhookSecret,
    };
    service = new StripeService({
      get: jest.fn((key: string) => values[key]),
    } as unknown as ConfigService);
  });

  it('constructs an event from a correctly signed raw payload', () => {
    const payload = JSON.stringify({
      id: 'evt_test',
      object: 'event',
      type: 'customer.subscription.updated',
      data: { object: {} },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload,
      secret: webhookSecret,
    });

    expect(
      service.constructWebhookEvent(Buffer.from(payload), signature),
    ).toMatchObject({ id: 'evt_test', type: 'customer.subscription.updated' });
  });

  it('rejects a webhook with an invalid signature', () => {
    expect(() =>
      service.constructWebhookEvent(Buffer.from('{}'), 'invalid'),
    ).toThrow();
  });
});

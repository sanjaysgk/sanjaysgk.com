'use server'

import { ActionError, actionClient } from '@/lib/safe-action/client'
import { botIdMiddleware } from '@/lib/safe-action/middleware'
import { NewsletterSchema } from '@/lib/validators'

export const subscribe = actionClient
  .use(botIdMiddleware)
  .inputSchema(NewsletterSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      // TODO: Connect newsletter provider (Resend, Mailchimp, etc.)
      console.log('Newsletter signup:', email)

      return {
        success: true,
        message: 'Thanks for subscribing! Newsletter coming soon.',
      }
    } catch (error) {
      console.error('Failed to subscribe:', error)
      if (error instanceof ActionError) {
        throw error
      }
      throw new ActionError('Oops, something went wrong while subscribing.')
    }
  })

import type { MiddlewareFn } from 'next-safe-action'

type BotIdMiddleware = MiddlewareFn<string, undefined, object, object>

export const botIdMiddleware: BotIdMiddleware = async ({ next }) => {
  // Bot protection disabled — add botid or other provider later
  return next()
}

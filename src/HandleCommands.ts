import { createKeyboardButtons } from './GrammyAdapter'
import { messages } from './Messages'

export function handleStartCommand(ctx: any) {
    ctx.reply(messages.welcomeMessage, {
        reply_markup: createKeyboardButtons([messages.exercise1, messages.help.button]),
    })
}
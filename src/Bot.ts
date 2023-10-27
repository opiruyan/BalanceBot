import { Bot } from 'grammy'
import 'dotenv/config'
import { messages } from './Messages'
import { handleResponse } from './HandleUserReponse'
import { state } from './State'

if (!process.env.BOT_TOKEN) {
    throw new Error('require BOT_TOKEN to interact with telegram API')
}

export const bot = new Bot(process.env.BOT_TOKEN)

bot.command('start', (ctx) => {
    state.currentChatId = ctx.chat?.id
    ctx.reply(messages.welcomeMessage, {
        reply_markup: {
            keyboard: [[messages.exercise1, messages.help]],
        },
    })
})

bot.on("message:text", (ctx) => {
    state.currentChatId = ctx.msg.chat.id
    handleResponse(state, ctx.message.text)
})

bot.start()

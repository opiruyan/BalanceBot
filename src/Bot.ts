import { Bot } from 'grammy'
import 'dotenv/config'
import { messages } from './Messages'
import { handleResponse } from './HandleUserReponse'
import { state } from './State'
import { createInlineKeyboard } from './GrammyAdapter'
import { handleStartCommand } from './HandleCommands'

if (!process.env.BOT_TOKEN) {
    throw new Error('require BOT_TOKEN to interact with telegram API')
}

export const bot = new Bot(process.env.BOT_TOKEN)

bot.command('start', (ctx) => {
    handleStartCommand(ctx)
})

bot.on("message:text", (ctx) => {
    handleResponse(ctx.msg.chat.id, state, ctx.message.text)
})

bot.on("callback_query:data", (ctx) => {
    handleResponse(ctx.chat?.id || 0, state, ctx.callbackQuery.data)
})

bot.start()

// https://grammy.dev/guide/commands
bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
])
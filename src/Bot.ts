import { Bot } from 'grammy'
import 'dotenv/config'
import { STATE_STAGE, deleteMessagesInChat, handleResponse, processUserResponse } from './HandleUserReponse'
import { state } from './State'
import { handleStartCommand } from './HandleCommands'

if (!process.env.BOT_TOKEN) {
    throw new Error('require BOT_TOKEN to interact with telegram API')
}

export const bot = new Bot(process.env.BOT_TOKEN)

bot.command('start', (ctx) => {
    handleStartCommand(ctx)
})

bot.on("message:text", (ctx) => {
    processUserResponse(ctx.msg.chat.id, state, ctx.message)
    handleResponse(ctx.msg.chat.id, state, ctx.message.text)

    let session = state.sessions.get(ctx.msg.chat.id)
    if (!session) {
        throw new Error('Session not found')
    }

    if (session.currentExercise === STATE_STAGE.SHOW_RESULTS) {
        deleteMessagesInChat(ctx.msg.chat.id, session.firstMessageId, ctx.msg.message_id)
        session.currentExercise = 0
    }
})

bot.on("callback_query:data", (ctx) => {
    handleResponse(ctx.chat?.id || 0, state, ctx.callbackQuery.data)
})

bot.start()

// https://grammy.dev/guide/commands
bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
])
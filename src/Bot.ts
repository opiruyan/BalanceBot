import { Bot } from 'grammy'
import 'dotenv/config'

if (!process.env.BOT_TOKEN) {
    throw new Error('require BOT_TOKEN to interact with telegram API')
}

const bot = new Bot(process.env.BOT_TOKEN)

bot.start()

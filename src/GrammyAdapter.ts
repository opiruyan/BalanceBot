import { messages } from './Messages'
import { bot } from './Bot'
import { state } from './State'
import { Menu } from '@grammyjs/menu'

export function hideKeyboard() {
    bot.api.sendMessage(state.currentChatId, messages.bye, {
        reply_markup: {
            remove_keyboard: true,
        },
    })
}

export function showFirstExercise(chatId: number) {
    bot.api.sendMessage(chatId, messages.exercise1, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_1],
        },
    })
}

export function showSecondExercise(chatId: number) {
    bot.api.sendMessage(chatId, messages.exerciseTitle_2, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_2],
        },
    })
}

export function showThirdExercise(chatId: number) {
    bot.api.sendMessage(chatId, messages.exerciseTitle_3, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_3],
        },
    })
}

export function showFourthExercise(chatId: number) {
    bot.api.sendMessage(chatId, messages.exerciseTitle_4, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_4],
        },
    })
}

export const startMenu = new Menu("startMenu")
    .text(messages.welcomeButton, handleBeginFirstExercise).row()

function handleBeginFirstExercise(ctx: any) {
        ctx.menu.close()
        ctx.api.sendMessage(ctx.chat.id, messages.welcomeButton)
    }

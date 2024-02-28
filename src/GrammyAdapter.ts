import { messages } from './Messages'
import { bot } from './Bot'
import { state } from './State'
import { Menu } from '@grammyjs/menu'

export function hideKeyboard(chatId: number) {
    bot.api.sendMessage(chatId, messages.bye, {
        reply_markup: {
            remove_keyboard: true,
        },
    })
}

export function showFirstExercise(chatId: number) {
    const message = messages.exerciseTitle_1 + '\n' + messages.exerciseMessage_1
    bot.api.sendMessage(chatId, message, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_1],
        },
    })
}

export function showSecondExercise(chatId: number) {
    const message = messages.exerciseTitle_2 + '\n' + messages.exerciseMessage_2
    bot.api.sendMessage(chatId, message, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_2],
        },
    })
}

export function showThirdExercise(chatId: number) {
    const message = messages.exerciseTitle_3 + '\n' + messages.exerciseMessage_3
    bot.api.sendMessage(chatId, message, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_3],
        },
    })
}

export function showFourthExercise(chatId: number) {
    const message = messages.exerciseTitle_4 + '\n' + messages.exerciseMessage_4
    bot.api.sendMessage(chatId, message, {
        reply_markup: {
            keyboard: [messages.exerciseOptions_4],
        },
    })
}

export function showResults(chatId: number) {
    const session = state.sessions.get(chatId)
    const resulstString = `Итоги Сессии:\n` +
        `Время: ${sessionTime()}\n` +
        `Играет волна: ${session!.session.catchingThoughts}\n`+
        `Внутренняя Скорость: ${mapEnergyLevelToText(session!.session.energyLevel)}\n`+
        `Внутренний Компас: ${session!.session.compass}\n`+
        'Увидимся через пару часов'
    bot.api.sendMessage(chatId, resulstString)
}

function mapEnergyLevelToText(energyLevel: string) {
    switch (energyLevel) {
        case '+1':
            return 'много энергии'
        case '0':
            return 'внутренний покой'
        case '-1':
            return 'мало энергии'
        default:
            return 'ошибка'
    }
}

function sessionTime() {
    return new Date().toLocaleTimeString()
}

export const startMenu = new Menu("startMenu")
    .text(messages.welcomeButton, handleBeginFirstExercise).row()

function handleBeginFirstExercise(ctx: any) {
        ctx.menu.close()
        ctx.api.sendMessage(ctx.chat.id, messages.welcomeButton)
    }

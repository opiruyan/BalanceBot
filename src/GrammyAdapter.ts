import { messages } from './Messages'
import { bot } from './Bot'
import { state } from './State'
import { Menu } from '@grammyjs/menu'
import { InlineKeyboard } from 'grammy'

export function hideKeyboard(chatId: number) {
    bot.api.sendMessage(chatId, messages.bye, {
        reply_markup: {
            remove_keyboard: true,
        },
    })
}

export function showFirstExercise(chatId: number) {
    const message = messages.exerciseTitle_1 + '\n' + messages.exerciseMessage_1
    const keyboard = createKeyboardButtons(messages.exerciseOptions_1)
    bot.api.sendMessage(chatId, message, {
        reply_markup: keyboard,
    })
}

export function createInlineKeyboard(keys: string[]) {
    // const buttonRow = keys.map(label => InlineKeyboard.text(label))
    const keyboard = new InlineKeyboard()
    keys.forEach(key => {
        keyboard.text(key).row()
    })
    // const keyboard = InlineKeyboard.from([buttonRow])
    return keyboard
}

export function showSecondExercise(chatId: number) {
    const message = messages.exerciseTitle_2 + '\n' + messages.exerciseMessage_2
    bot.api.sendMessage(chatId, message, {
        reply_markup: createKeyboardButtons(messages.exerciseOptions_2),
    })
}

export function showThirdExercise(chatId: number) {
    const message = messages.exerciseTitle_3 + '\n' + messages.exerciseMessage_3
    bot.api.sendMessage(chatId, message, {
        reply_markup: createKeyboardButtons(messages.exerciseOptions_3),
    })
}

export function showFourthExercise(chatId: number) {
    const message = messages.exerciseTitle_4 + '\n' + messages.exerciseMessage_4
    bot.api.sendMessage(chatId, message, {
        reply_markup: createKeyboardButtons(messages.exerciseOptions_4),
    })
}

export async function showResults(chatId: number) {
    const session = state.sessions.get(chatId)
    const resulstString = `Итоги Сессии:\n` +
        `Время: ${sessionTime()}\n` +
        `Играет волна: ${session!.session.catchingThoughts}\n`+
        `Внутренняя Скорость: ${mapEnergyLevelToText(session!.session.energyLevel)}\n`+
        `Внутренний Компас: ${session!.session.compass}\n`+
        'Увидимся через пару часов'
    await bot.api.sendMessage(chatId, resulstString)
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

export function showHelp(chatId: number) {
    // const message = messages.exerciseTitle_1 + '\n' + messages.exerciseMessage_1
    const keyboard = createKeyboardButtons([messages.exit])
    bot.api.sendMessage(chatId, 'Здесь будет информация о связи и помощи', {
        reply_markup: keyboard,
    })
}

export function createKeyboardButtons(keys: string[]) {
    let rows: string[][] = [keys]

    if (keys.length > 2) {
        rows = []
        for (let i = 0; i < keys.length; i += 2) {
            rows.push(keys.slice(i, i + 2))
        }
    }

    return { 
        keyboard: rows,
        resize_keyboard: true
    }
}
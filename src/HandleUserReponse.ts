import { Message } from 'grammy/types'
import { deleteMessage, hideKeyboard, showFirstExercise, showFourthExercise, showHelp, showIntro, showResults, showSecondExercise, showThirdExercise } from './GrammyAdapter'
import { messages } from './Messages'

type ChatId = number

export type BotState = {
    sessions: Map<ChatId, {
        currentExercise: number
        currentChatId: number
        firstMessageId: number
        session: SessionAnswers
    }>
}

export type SessionAnswers = {
    catchingThoughts: 'Думаю о себе' | 'Думаю о ком-то' | 'Думаю о делах' | 'Волна тишины',
    balanceCoin: 'Да',
    energyLevel: '+1' | '0' | '-1',
    compass: 'Созерцание [Развитие]' | 'Поддержание [Сохранение]' | 'Разрушение [Износ]' | 'Наблюдение [Невмешательство]',
}

export const STATE_STAGE = {
    FIRST_EXERCISE: 1,
    SECOND_EXERCISE: 2,
    THIRD_EXERCISE: 3,
    FOURTH_EXERCISE: 4,
    SHOW_RESULTS: 5,
} as const

export async function processUserResponse(chatId: number, state: BotState, message: Message) {
    let session = state.sessions.get(chatId)
    if (!session) {
        session = {
            currentExercise: 0,
            currentChatId: chatId,
            firstMessageId: message.message_id,
            session: {
                catchingThoughts: 'Думаю о себе',
                balanceCoin: 'Да',
                energyLevel: '+1',
                compass: 'Созерцание [Развитие]'
            }
        }
        state.sessions.set(chatId, session)
    }
}

export async function handleResponse(chatId: number, state: BotState, message: string) {
    let session = state.sessions.get(chatId)
    if (!session) {
        throw new Error('Session not found')
    }

    if (message === messages.exit)  {
        state.sessions.delete(chatId)
        hideKeyboard(chatId)
        return
    }

    if (message === messages.help.button) {
        showHelp(chatId)
        return
    }

    if (message !== messages.goBack) {
        session.currentExercise++
    }

    switch (session.currentExercise) {
        case STATE_STAGE.FIRST_EXERCISE:
            showFirstExercise(session.currentChatId)
            break
        case STATE_STAGE.SECOND_EXERCISE:
            if (session) {
                session.session.catchingThoughts = message as SessionAnswers['catchingThoughts']
            }
            showSecondExercise(session.currentChatId)
            break
        case STATE_STAGE.THIRD_EXERCISE:
            session.session.balanceCoin = message as SessionAnswers['balanceCoin']
            showThirdExercise(session.currentChatId)
            break  
        case STATE_STAGE.FOURTH_EXERCISE:
            session.session.compass = message as SessionAnswers['compass']
            showFourthExercise(session.currentChatId)
            break
        case STATE_STAGE.SHOW_RESULTS:
            session.session.compass = message as SessionAnswers['compass']
            await showResults(session.currentChatId)
            hideKeyboard(chatId)
            break
        default:
            showIntro(chatId)
   }
}


export function deleteMessagesInChat(chatId: number, stopMessageId: number, latestMessageId: number) {
    let currentMessageId = latestMessageId
    while (currentMessageId > stopMessageId - 3) {
        deleteMessage(chatId, currentMessageId)
        currentMessageId--
    }
}
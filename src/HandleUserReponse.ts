import { hideKeyboard, showFirstExercise, showFourthExercise, showSecondExercise, showThirdExercise } from './GrammyAdapter'
import { messages } from './Messages'

export type BotState = {
    currentExercise: number
    currentChatId: number
}

export const STATE_STAGE = {
    FIRST_EXERCISE: 1,
    SECOND_EXERCISE: 2,
    THIRD_EXERCISE: 3,
    FOURTH_EXERCISE: 4,
} as const

export function handleResponse(state: BotState, message: string) {
    if (message === messages.exit)  {
        state.currentExercise = 0
        hideKeyboard()
        return
    }

    state.currentExercise++
    switch (state.currentExercise) {
        case STATE_STAGE.FIRST_EXERCISE:
            showFirstExercise(state.currentChatId)
            break
        case STATE_STAGE.SECOND_EXERCISE:
            showSecondExercise(state.currentChatId)
            break
        case STATE_STAGE.THIRD_EXERCISE:
            showThirdExercise(state.currentChatId)
            break  
        case STATE_STAGE.FOURTH_EXERCISE:
            showFourthExercise(state.currentChatId)
            break
   }
}

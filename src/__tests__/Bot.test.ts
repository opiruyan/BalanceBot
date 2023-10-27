import { BotState, handleResponse } from "../HandleUserReponse"
import { messages } from "../Messages"

jest.mock('../Bot', () => ({bot :{ api: { sendMessage: jest.fn()}}}))

describe('Bot', () => {
    it('test', () => expect(1).toBe(1))

    it('handleResponse increases a state stage if its not an exit message' , () => {
        const state: BotState = {
            currentExercise: 1,
            currentChatId: 0,
        }

        // when
        handleResponse(state, 'some message but not exit')

        // then
        expect(state.currentExercise).toBe(2)
    })

    it('handleResponse sets state to 0 if its an exit message' , () => {
        const state: BotState = {
            currentExercise: 1,
            currentChatId: 0,
        }

        // when
        handleResponse(state, messages.exit)

        // then
        expect(state.currentExercise).toBe(0)
    })

    it('handleResponse sets state to 0 if its an exit message' , () => {
        const state: BotState = {
            currentExercise: 1,
            currentChatId: 0,
        }

        // when
        handleResponse(state, messages.exit)

        // then
        expect(state.currentExercise).toBe(0)
    })
})
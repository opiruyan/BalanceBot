import { showSecondExercise } from '../GrammyAdapter'
import { BotState, handleResponse } from '../HandleUserReponse'
import { messages } from '../Messages'

jest.mock('../Bot', () => ({bot :{ api: { sendMessage: jest.fn()}}}))
jest.mock('../GrammyAdapter')

describe('Bot', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('test', () => expect(1).toBe(1))

    it('handleResponse increases a state stage if its not an exit message' , () => {
        const state = createInitalState({currentExercise: 1})

        // when
        handleResponse(state, 'some message but not exit')

        // then
        expect(state.currentExercise).toBe(2)
    })

    it('handleResponse sets state to 0 if its an exit message' , () => {
        const state = createInitalState({currentExercise: 1})

        // when
        handleResponse(state, messages.exit)

        // then
        expect(state.currentExercise).toBe(0)
    })

    it('handleResponse sets state to 0 if its an exit message' , () => {
        const state = createInitalState({currentExercise: 1})

        // when
        handleResponse(state, messages.exerciseOptions_1[0])

        // then
        expect(showSecondExercise).toHaveBeenCalled()
    })

    it('handleResponse sets state to 0 if its an exit message' , () => {
        const state = createInitalState({currentExercise: 2})

        // when
        handleResponse(state, messages.exerciseOptions_1[0])

        // then
        expect(showSecondExercise).not.toHaveBeenCalled()
    })

    it('the stores the answer to the first exercise' , () => {
        const state = createInitalState({currentExercise: 1})

        // when
        handleResponse(state, messages.exerciseOptions_1[0])

        // then
        expect(state.session?.catchingThoughts).toEqual(messages.exerciseOptions_1[0])
    })

})


function createInitalState(state: Partial<BotState>): BotState {
    return {
        currentExercise: 0,
        currentChatId: 0,
        session: undefined,
        ...state,
    }

}
import {
    AppInitialStateType,
    appReducer_old,
    setAppErrorActionCreator,
    setAppStatusActionCreator
} from "../app/app-reducer_old";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
});

test('correct error message should be set', () => {
    const endState = appReducer_old(startState,setAppErrorActionCreator('some error'))
    expect(endState.error).toBe('some error')
});


test('correct status  should be set', () => {
    const endState = appReducer_old(startState,setAppStatusActionCreator("failed"))
    expect(endState.status).toBe('failed')
})

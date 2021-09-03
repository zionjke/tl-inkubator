import {
    AppInitialStateType,
    appReducer,
    setAppErrorActionCreator,
    setAppStatusActionCreator
} from "../app/app-reducer";

let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
});

test('correct error message should be set', () => {
    const endState = appReducer(startState,setAppErrorActionCreator('some error'))
    expect(endState.error).toBe('some error')
});


test('correct status  should be set', () => {
    const endState = appReducer(startState,setAppStatusActionCreator("failed"))
    expect(endState.status).toBe('failed')
})

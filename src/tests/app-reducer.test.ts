import appReducer, {AppInitialStateType, initializeApp, setAppError, setAppStatus} from "../app/app-reducer";


let startState: AppInitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    }
});

test('correct error message should be set', () => {
    const action = setAppError('some error message')
    const endState = appReducer(startState,action)
    expect(endState.error).toBe('some error message')
});


test('correct status  should be set', () => {
    const action = setAppStatus("failed")
    const endState = appReducer(startState,action)
    expect(endState.status).toBe('failed')
})


test('correct App initialized status  should be set', () => {
    // const action = setIsInitialized(true)
    const action = initializeApp.fulfilled
    const endState = appReducer(startState,action)
    expect(endState.isInitialized).toBe(true)
})

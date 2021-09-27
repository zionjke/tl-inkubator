import tasksReducer, {TasksStateType} from "../features/todolists/tasks-reducer";
import todolistsReducer, {createTodoList, TodolistDomainType} from "../features/todolists/todolists-reducer";


test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []
    const params = {id: 'todoListId', title: 'second todolist', addedDate: '', order: 0}
    const action = createTodoList.fulfilled(params,'',params.title)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload?.id)
    expect(idFromTodolists).toBe(action.payload?.id)
});

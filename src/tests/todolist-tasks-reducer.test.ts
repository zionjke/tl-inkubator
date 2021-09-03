import {createTodoListActionCreator, TodolistDomainType, todolistsReducer} from "../features/todolists/todolists-reducer";
import {tasksReducer, TasksStateType} from "../features/todolists/tasks-reducer";


test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = createTodoListActionCreator({id: 'todoListId', title: 'second todolist', addedDate: '', order: 0},)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
});

import {createTodoListActionCreator, TodolistDomainType, todolistsReducer_old} from "../features/todolists/todolists-reducer_old";
import {tasksReducer_old, TasksStateType} from "../features/todolists/tasks-reducer_old";


test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = []

    const action = createTodoListActionCreator({id: 'todoListId', title: 'second todolist', addedDate: '', order: 0},)

    const endTasksState = tasksReducer_old(startTasksState, action)
    const endTodolistsState = todolistsReducer_old(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
});

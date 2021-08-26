import {TaskStateType, TodoListType} from "../types/types";
import {addTodoListActionCreator, todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";

test('Ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: TodoListType[] = []

    const action = addTodoListActionCreator('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodolists).toBe(action.todoListId)
});

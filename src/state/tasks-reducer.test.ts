import {v1} from "uuid"
import {TaskStateType} from "../types/types";
import {
    addNewTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./tasks-reducer";
import {addTodoListActionCreator, removeTodoListActionCreator} from "./todolists-reducer";

test('correct task should be added', () => {
    let todoListID = v1()
    let newTaskTitle = 'New Task'

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, addNewTaskActionCreator(todoListID, newTaskTitle))

    expect(endState[todoListID][2].title).toBe(newTaskTitle)
    expect(endState[todoListID][2].isDone).toBe(false)
    expect(endState[todoListID][2].id).toBeDefined()
})

test('task status should be updated', () => {
    let todoListID = v1()
    let taskID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: taskID, title: 'Third Task', isDone: false},
        ],

    }

    const endState = tasksReducer(startState, changeTaskStatusActionCreator(todoListID, taskID, true))

    expect(endState[todoListID][2].isDone).toBe(true)

})

test('task title should be updated', () => {
    let todoListID = v1()
    let taskID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: taskID, title: 'Third Task', isDone: false},
        ],

    }

    const endState = tasksReducer(startState, changeTaskTitleActionCreator(todoListID, taskID, 'Updated Title'))

    expect(endState[todoListID][2].title).toBe('Updated Title')

})


test('correct task should be removed', () => {
    let todoListID = v1()
    let taskID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: taskID, title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, removeTaskActionCreator(todoListID, taskID))

    expect(endState[todoListID].length).toBe(2)
    expect(endState[todoListID][0].title).toBe('Second Task')
    expect(endState[todoListID].every(t => t.id !== taskID)).toBeTruthy() // пробегаемся по массиву и проверяем что ниодна таска не имеет такого айди

})

test('new array should be added when new todolist is added', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let taskID = v1()

    const startState: TaskStateType = {
        [todoListID1]: [
            {id: taskID, title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ],
        [todoListID2] : [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ]
    }

    const endState = tasksReducer(startState,addTodoListActionCreator('new todo'))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID1 && key !== todoListID2);
    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('array should be deleted when  todolist is removed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()
    let taskID = v1()

    const startState: TaskStateType = {
        [todoListID1]: [
            {id: taskID, title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ],
        [todoListID2] : [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ]
    }

    const endState = tasksReducer(startState,removeTodoListActionCreator(todoListID1))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(todoListID2)

})

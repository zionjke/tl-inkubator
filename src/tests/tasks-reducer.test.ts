import {v1} from "uuid"
import {TaskPriorities, TaskStateType, TaskStatuses} from "../types/types";
import {
    addNewTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "../state/tasks-reducer";
import {addTodoListActionCreator, removeTodoListActionCreator} from "../state/todolists-reducer";

let todoListID1: string;
let todoListID2: string;
let taskID: string;
let startState: TaskStateType;
let newTaskTitle: string;

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    taskID = v1()
    startState = {
        [todoListID1]: [
            {
                id: taskID,
                title: 'First Task',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1
            },
            {
                id: v1(), title: 'Second Task', status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1
            },
            {
                id: v1(), title: 'Third Task', status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1
            },
        ],
        [todoListID2]: [
            {
                id: taskID,
                title: 'First Task',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2
            },
            {
                id: v1(), title: 'Second Task', status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2
            },
            {
                id: v1(), title: 'Third Task', status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2
            },
        ]
    }
})

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addNewTaskActionCreator(todoListID1, newTaskTitle))

    expect(endState[todoListID1][3].title).toBe(newTaskTitle)
    expect(endState[todoListID1][3].status).toBe( TaskStatuses.New)
    expect(endState[todoListID1][3].id).toBeDefined()
})

test('task status should be updated', () => {
    const endState = tasksReducer(startState, changeTaskStatusActionCreator(todoListID1, taskID, TaskStatuses.New))

    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('task title should be updated', () => {
    const endState = tasksReducer(startState, changeTaskTitleActionCreator(todoListID1, taskID, 'Updated Title'))

    expect(endState[todoListID1][0].title).toBe('Updated Title')
})


test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskActionCreator(todoListID1, taskID))

    expect(endState[todoListID1].length).toBe(2)
    expect(endState[todoListID1][0].title).toBe('Second Task')
    expect(endState[todoListID1].every(t => t.id !== taskID)).toBeTruthy() // пробегаемся по массиву и проверяем что ниодна таска не имеет такого айди

})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodoListActionCreator('new todo'))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID1 && key !== todoListID2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('array with tasks should be deleted when  todolist is removed', () => {
    const endState = tasksReducer(startState, removeTodoListActionCreator(todoListID1))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(todoListID2)

})

import {v1} from "uuid"
import {
    createTaskActionCreator,
    removeTaskActionCreator, setTasksActionCreator,
    tasksReducer_old, TasksStateType, updateTask, updateTaskActionCreator
} from "../old_trash/tasks-reducer_old";
import {
    createTodoListActionCreator,
    removeTodoListActionCreator,
    setTodolistsActionCreator
} from "../old_trash/todolists-reducer_old";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

let todoListID1: string;
let todoListID2: string;
let taskID: string;
let startState: TasksStateType;
let newTaskTitle: string;

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    taskID = v1()
    startState = {
        [todoListID1]: [
            {
                id: taskID,
                title: 'First TaskWithUseState',
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
                id: v1(),
                title: 'Second TaskWithUseState',
                status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1
            },
            {
                id: v1(),
                title: 'Third TaskWithUseState',
                status: TaskStatuses.New, addedDate: '',
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
                title: 'First TaskWithUseState',
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
                id: v1(), title: 'Second TaskWithUseState', status: TaskStatuses.New, addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2
            },
            {
                id: v1(), title: 'Third TaskWithUseState', status: TaskStatuses.New, addedDate: '',
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
    const endState = tasksReducer_old(startState, createTaskActionCreator(todoListID1, {
        id: v1(),
        title: 'Third TaskWithUseState',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todoListID2
    },))

    expect(endState[todoListID1][3].title).toBe('Third TaskWithUseState')
    expect(endState[todoListID1][3].status).toBe(TaskStatuses.New)
    expect(endState[todoListID1][3].id).toBeDefined()
})

test('task status should be updated', () => {
    const endState = tasksReducer_old(startState, updateTaskActionCreator(todoListID1, taskID, {status: TaskStatuses.New}))

    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('task title should be updated', () => {
    const endState = tasksReducer_old(startState, updateTaskActionCreator(todoListID1, taskID, {title: 'Updated Title'}))

    expect(endState[todoListID1][0].title).toBe('Updated Title')
})


test('correct task should be removed', () => {
    const endState = tasksReducer_old(startState, removeTaskActionCreator(todoListID1, taskID))

    expect(endState[todoListID1].length).toBe(2)
    expect(endState[todoListID1][0].title).toBe('Second TaskWithUseState')
    expect(endState[todoListID1].every(t => t.id !== taskID)).toBeTruthy() // пробегаемся по массиву и проверяем что ниодна таска не имеет такого айди

})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer_old(startState, createTodoListActionCreator({
        id: 'todoListId3',
        title: 'first todolist',
        addedDate: '',
        order: 0
    },))

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID1 && key !== todoListID2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('array with tasks should be deleted when  todolist is removed', () => {
    const endState = tasksReducer_old(startState, removeTodoListActionCreator(todoListID1))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(todoListID2)

})

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsActionCreator([
        {id: 'todoListId1', title: 'first todolist', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'second todolist', addedDate: '', order: 0},
    ])
    const endState = tasksReducer_old({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(keys[1]).toBe('todoListId2')

})

test('tasks should be set to the state', () => {
    const endState = tasksReducer_old({
        [todoListID1]: [],
        [todoListID2]: []
    }, setTasksActionCreator(todoListID1, startState[todoListID1]))
    expect(endState[todoListID1].length).toBe(3)
});



import {v1} from "uuid"
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import tasksReducer, {
    createTask,
    fetchTasks,
    removeTask,
    TasksStateType,
    updateTask
} from "../features/todolists/tasks-reducer";
import {createTodoList, fetchTodoLists, removeTodoList} from "../features/todolists/todolists-reducer";

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
                todoListId: todoListID1,
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: 'Second TaskWithUseState',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1,
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: 'Third TaskWithUseState',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID1,
                entityStatus: "idle"
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
                todoListId: todoListID2,
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: 'Second TaskWithUseState',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2,
                entityStatus: "idle"
            },
            {
                id: v1(),
                title: 'Third TaskWithUseState',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: todoListID2,
                entityStatus: "idle"
            },
        ]
    }
})

test('correct task should be added', () => {
    const task = {
        id: v1(),
        title: 'New Task',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: todoListID2
    }
    const param = {todolistId: todoListID1, task}
    const action = createTask.fulfilled(param, '', {todolistId: todoListID1, title: task.title})
    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('New Task')
    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
    expect(endState[todoListID1][0].id).toBeDefined()
})

test('task status should be updated', () => {
    const params = {todolistId: todoListID1, taskId: taskID, domainModel: {status: TaskStatuses.New}}
    const action = updateTask.fulfilled(params, '', params)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].status).toBe(TaskStatuses.New)
})

test('task title should be updated', () => {
    // const action = changeTask({todolistId: todoListID1, taskId: taskID, model: {title: 'Updated Title'}})
    const params = {todolistId: todoListID1, taskId: taskID, domainModel: {title: 'Updated Title'}}
    const action = updateTask.fulfilled(params, '', params)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1][0].title).toBe('Updated Title')
})


test('correct task should be removed', () => {
    // const action = deleteTask({todolistId: todoListID1, taskId: taskID})
    const param = {todolistId: todoListID1, taskId: taskID}
    const action = removeTask.fulfilled(param, '', param)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListID1].length).toBe(2)
    expect(endState[todoListID1][0].title).toBe('Second TaskWithUseState')
    expect(endState[todoListID1].every(t => t.id !== taskID)).toBeTruthy() // пробегаемся по массиву и проверяем что ниодна таска не имеет такого айди

})

test('new array should be added when new todolist is added', () => {
    const todolist = {
        id: 'todoListId3',
        title: 'first todolist',
        addedDate: '',
        order: 0
    }
    const action = createTodoList.fulfilled(todolist,'',todolist.title)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoListID1 && key !== todoListID2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('array with tasks should be deleted when  todolist is removed', () => {
    const action = removeTodoList.fulfilled({id: todoListID1}, '', todoListID1)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(todoListID2)

})

test('empty arrays should be added when we set todolists', () => {
    const action = fetchTodoLists.fulfilled([
        {id: 'todoListId1', title: 'first todolist', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'second todolist', addedDate: '', order: 0},
    ], '')
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(keys[1]).toBe('todoListId2')

})

test('tasks should be set to the state', () => {
    // const action = setTasks({todolistId: todoListID1, tasks: startState[todoListID1]})
    const action = fetchTasks.fulfilled({todolistId: todoListID1, tasks: startState[todoListID1]}, '', todoListID1)
    const endState = tasksReducer({
        [todoListID1]: [],
        [todoListID2]: []
    }, action)
    expect(endState[todoListID1].length).toBe(3)
});



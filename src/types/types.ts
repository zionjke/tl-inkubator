export type TodoListType = {
    id: string
    title: string
    filter:FilterValuesType
}

export type TaskStateType = {
    [key:string]: Array<TaskType>
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Completed' | 'Active'

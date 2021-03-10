import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../types/types";


type Props = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addNewTask: (title: string, todolistID: string) => void
    removeTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, todolistID: string, status: boolean) => void
    changeTodolistFilter: (newFilter: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
};

export const TodoList: React.FC<Props> = ({
                                              title,
                                              tasks,
                                              addNewTask,
                                              todolistID,
                                              filter,
                                              removeTask,
                                              changeTaskStatus,
                                              changeTodolistFilter,
                                              removeTodoList
                                          }) => {

    const [taskTitle, setTaskTitle] = React.useState<string>('');
    const [error, setError] = useState<string | null>('')

    const onChangeHandlerTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onChangeTaskStatusHandler = (taskID: string, status: boolean) => {
        changeTaskStatus(taskID, todolistID, status)
    }

    const removeTaskHandler = (taskID: string) => {
        removeTask(taskID, todolistID)
    }


    const onAddNewTask = () => {
        if (taskTitle.trim() !== '') {
            addNewTask(taskTitle, todolistID)
            setTaskTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }

    }


    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddNewTask()
        }
    }


    const onClickRemoveTodoList = () => {
        removeTodoList(todolistID)
    }

    const setAllFilter = () => changeTodolistFilter('All', todolistID)
    const setActiveFilter = () => changeTodolistFilter('Active', todolistID)
    const setCompletedFilter = () => changeTodolistFilter('Completed', todolistID)


    return (
        <div>
            <div className='todolistTitle'>
                <h2>
                    {title}
                    <button onClick={onClickRemoveTodoList}>X</button>
                </h2>

            </div>
            <div>
                <input onChange={onChangeHandlerTaskTitle}
                       className={error ? 'error' : ''}
                       onKeyPress={addTaskOnKeyPress}
                       value={taskTitle}
                       type="text"/>
                <button onClick={onAddNewTask}>+</button>
                {
                    error && <p className={'errorMessage'}>{error}</p>
                }
            </div>
            <ul>
                {
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            removeTask={removeTaskHandler}
                            changeTaskStatus={onChangeTaskStatusHandler}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <button className={filter === 'All' ? 'activeButton' : ''} onClick={setAllFilter}>All</button>
                <button className={filter === 'Active' ? 'activeButton' : ''} onClick={setActiveFilter}>Active</button>
                <button className={filter === 'Completed' ? 'activeButton' : ''}
                        onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    );
};

import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../types/types";


type Props = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addNewTask: (title: string, todolistID: string) => void
    removeTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, todolistID: string, status: boolean) => void
    changeTodolistFilter: (newFilter: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID:string) => void
};

export const TodoList: React.FC<Props> = ({
                                              title,
                                              tasks,
                                              addNewTask,
                                              id,
                                              filter,
                                              removeTask,
                                              changeTaskStatus,
                                              changeTodolistFilter,
                                              removeTodoList
                                          }) => {

    const [taskTitle, setTaskTitle] = React.useState<string>('');

    const onChangeHandlerTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }


    const onAddNewTask = () => {
        if (taskTitle !== '') {
            addNewTask(taskTitle, id)
        }
        setTaskTitle('')
    }


    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddNewTask()
        }
    }


    const onClickRemoveTodoList = () => {
        removeTodoList(id)
    }

    const setAllFilter = () => changeTodolistFilter('All', id)
    const setActiveFilter = () => changeTodolistFilter('Active', id)
    const setCompletedFilter = () => changeTodolistFilter('Completed', id)


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
                       onKeyPress={addTaskOnKeyPress}
                       value={taskTitle}
                       type="text"/>
                <button onClick={onAddNewTask}>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            removeTask={(taskID: string) => removeTask(taskID, id)}
                            changeTaskStatus={(taskId: string, status) => changeTaskStatus(taskId, id, status)}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <button className={`${filter === 'All' && 'activeButton'}`} onClick={setAllFilter}>All</button>
                <button className={`${filter === 'Active' && 'activeButton'}`} onClick={setActiveFilter}>Active</button>
                <button className={`${filter === 'Completed' && 'activeButton'}`} onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>
    );
};

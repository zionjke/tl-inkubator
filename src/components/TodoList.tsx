import React, {ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Task} from "./Task";

type Props = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    addNewTask: (title: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
};

export const TodoList: React.FC<Props> = ({title, tasks, removeTask, changeTaskStatus, addNewTask, changeFilter}) => {

    const [taskTitle, setTaskTitle] = React.useState<string>('');

    const onChangeHandlerTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onAddNewTask = () => {

        if (taskTitle !== '') {
            addNewTask(taskTitle)
        }
        setTaskTitle('')
    }

    const addTaskOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddNewTask()
        }
    }

    const setAllFilter = () => changeFilter('All')
    const setActiveFilter = () => changeFilter('Active')
    const setCompletedFilter = () => changeFilter('Completed')


    return (
        <div>
            <h2>{title}</h2>
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
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <button onClick={setAllFilter}>All</button>
                <button onClick={setActiveFilter}>Active</button>
                <button onClick={setCompletedFilter}>Completed</button>
            </div>
        </div>
    );
};

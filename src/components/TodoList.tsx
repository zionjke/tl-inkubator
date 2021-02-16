import * as React from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Task} from "./Task";



type Props = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeTaskStatus: (taskId: number, status: boolean) => void
    addNewTask: (title: string) => void
    changeFilter:(newFilterValue:FilterValuesType) => void
};
export const TodoList = ({title, tasks, removeTask, changeTaskStatus, addNewTask,changeFilter}: Props) => {

    const [taskTitle, setTaskTitle] = React.useState<string>('');

    const onAddNewTask = () => {
        if (taskTitle !== '') {
            addNewTask(taskTitle)
        }
        setTaskTitle('')

    }

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input onChange={(e) => setTaskTitle(e.currentTarget.value)} value={taskTitle} type="text"/>
                <button onClick={onAddNewTask}>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => (
                        <Task
                            id={task.id}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            key={task.id}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <button onClick={() => changeFilter('All')}>All</button>
                <button onClick={() => changeFilter('Active')}>Active</button>
                <button onClick={() => changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
};

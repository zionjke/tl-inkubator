import * as React from 'react';
import {ChangeEvent} from "react";



type Props = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
};

export const Task: React.FC<Props> = ({title, isDone, removeTask, id, changeTaskStatus}) => {

    const onDeleteTask = () => {
        removeTask(id)
    }

    const onTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
        changeTaskStatus(id, e.currentTarget.checked)
    }

    return (
        <li>
            <input onChange={onTaskStatus} type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <button onClick={onDeleteTask}>X</button>
        </li>
    );
};

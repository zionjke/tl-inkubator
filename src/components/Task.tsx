// @flow
import * as React from 'react';
import {ChangeEvent} from "react";
import {FilterValuesType} from "../App";


type Props = {
    id: number
    title: string
    isDone: boolean
    removeTask: (taskID: number) => void
    changeTaskStatus: (taskId: number, status: boolean) => void
};
export const Task = ({title, isDone, removeTask, id, changeTaskStatus}: Props) => {

    const taskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
        changeTaskStatus(id, e.currentTarget.checked)
    }

    return (
        <li>
            <input onChange={taskStatus} type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <button onClick={() => removeTask(id)}>X</button>
        </li>
    );
};

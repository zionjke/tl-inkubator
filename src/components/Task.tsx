import * as React from 'react';
import {ChangeEvent, useState} from "react";
import { AddItemForm } from './AddItemForm';
import {EditableTitle} from "./EditableTitle";
import {Button} from "./Button";


type Props = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
};

export const Task: React.FC<Props> = (props) => {

    const onDeleteTask = () => {
        props.removeTask(props.id)
    }

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
        props.changeTaskStatus(props.id, e.currentTarget.checked)
    }

    const onChangeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.id, title)
    }




    return (
        <li className={props.isDone ? 'is-done' : ''}>
            <input onChange={onChangeTaskStatus} type="checkbox" checked={props.isDone}/>
            <EditableTitle title={props.title} changeTitle={onChangeTaskTitle}/>
            <Button onClick={onDeleteTask}>X</Button>
        </li>
    );
};

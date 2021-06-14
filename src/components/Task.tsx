import * as React from 'react';
import {ChangeEvent} from "react";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";



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
            <Checkbox onChange={onChangeTaskStatus} checked={props.isDone}/>
            {/*<input onChange={onChangeTaskStatus} type="checkbox" checked={props.isDone}/>*/}
            <EditableTitle title={props.title} changeTitle={onChangeTaskTitle}/>
            <IconButton color='secondary' className={"IconButton"} onClick={onDeleteTask}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
};

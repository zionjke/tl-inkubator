import * as React from 'react';
import {ChangeEvent} from "react";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../state/store";
import {TaskType} from "../types/types";
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from "../state/tasks-reducer";


type Props = {
    id: string
    todoListID:string
};

export const TaskWithRedux: React.FC<Props> = (props) => {
    const task = useSelector<GlobalStateType,TaskType>(state => {
        return state.tasks[props.todoListID].filter((task:TaskType) => task.id === props.id)[0]
    })
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskActionCreator(props.todoListID, task.id))
    const changeTaskStatus = ((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusActionCreator(props.todoListID, task.id, e.currentTarget.checked)))

    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleActionCreator(props.todoListID, task.id, title))
    }


    return (
        <li className={task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
            {/*<input onChange={onChangeTaskStatus} type="checkbox" checked={props.isDone}/>*/}
            <EditableTitle title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton color='secondary' className={"IconButton"} onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
};

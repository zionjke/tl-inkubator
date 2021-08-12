import * as React from 'react';
import {ChangeEvent, useCallback} from "react";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from "../state/tasks-reducer";
import {TaskType} from "../types/types";


type Props = {
    task: TaskType
    todoListID: string
};

export const TaskWithRedux: React.FC<Props> = React.memo((props) => {
    // console.log('Task called')
    const {
        task,
        todoListID,
    } = props

    const dispatch = useDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskActionCreator(todoListID, task.id)), [dispatch, todoListID, task.id])
    const changeTaskStatus = useCallback(((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusActionCreator(todoListID, task.id, e.currentTarget.checked))), [dispatch, todoListID, task.id])
    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleActionCreator(todoListID, task.id, title)), [dispatch, todoListID, task.id])


    return (
        <li className={task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
            <EditableTitle title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton color='secondary' className={"IconButton"}>
                <DeleteIcon onClick={removeTask}/>
            </IconButton>
        </li>
    );
});

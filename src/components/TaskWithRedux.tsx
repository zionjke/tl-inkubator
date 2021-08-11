import * as React from 'react';
import {ChangeEvent, useCallback} from "react";
import {EditableTitle} from "./EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from "../state/tasks-reducer";


type Props = {
    taskID: string
    todoListID: string
    title: string
    isDone: boolean
};

export const TaskWithRedux: React.FC<Props> = (props) => {
    // console.log('Task called')
    const {
        taskID,
        todoListID,
        title,
        isDone
    } = props
    // const task = useSelector<GlobalStateType,TaskType>(state => {
    //     return state.tasks[props.todoListID].filter((task:TaskType) => task.id === props.id)[0]
    // })
    const dispatch = useDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskActionCreator(todoListID, taskID)), [dispatch, todoListID, taskID])
    const changeTaskStatus = useCallback(((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusActionCreator(todoListID, taskID, e.currentTarget.checked))), [dispatch, todoListID, taskID])
    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleActionCreator(todoListID, taskID, title)), [dispatch, todoListID, taskID])


    return (
        <li className={isDone ? 'is-done' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={isDone}/>
            {/*<input onChange={onChangeTaskStatus} type="checkbox" checked={props.isDone}/>*/}
            <EditableTitle title={title} changeTitle={changeTaskTitle}/>
            <IconButton color='secondary' className={"IconButton"} onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
};

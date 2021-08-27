import * as React from 'react';
import {ChangeEvent, useCallback} from 'react';
import {EditableTitle} from "../EditableTitle/EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {
    changeTaskStatusActionCreator,
    changeTaskTitleActionCreator,
    removeTaskActionCreator
} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../types/types";


export type TaskPropsType = {
    task: TaskType
    todoListID: string
};

export const TaskWithRedux: React.FC<TaskPropsType> = React.memo((props) => {
    // console.log('Task called')
    const {
        task,
        todoListID,
    } = props

    const dispatch = useDispatch()

    const removeTask = useCallback(() => dispatch(removeTaskActionCreator(todoListID, task.id)), [dispatch, todoListID, task.id])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusActionCreator(todoListID, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)), [dispatch, todoListID, task.id])
    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleActionCreator(todoListID, task.id, title)), [dispatch, todoListID, task.id])


    console.log(task)

    return (
        <li className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableTitle title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton color='secondary' className={"IconButton"}>
                <DeleteIcon onClick={removeTask}/>
            </IconButton>
        </li>
    );
});

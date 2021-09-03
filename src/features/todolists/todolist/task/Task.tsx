import * as React from 'react';
import {ChangeEvent, useCallback} from 'react';
import {EditableTitle} from "../../../../components/EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {removeTask, TaskDomainType, updateTask} from "../../tasks-reducer";
import {TaskStatuses} from "../../../../api/tasks-api";



export type TaskPropsType = {
    task: TaskDomainType
    todoListID: string
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {
        task,
        todoListID,
    } = props

    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => dispatch(removeTask(todoListID, task.id)), [dispatch, todoListID, task.id])
    const updateTaskStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => dispatch(updateTask(todoListID, task.id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New})),
        [dispatch, todoListID, task.id])
    const updateTaskTitleHandler = useCallback((title: string) => dispatch(updateTask(todoListID, task.id, {title: title})), [dispatch, todoListID, task.id])


    return (
        <li className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox onChange={updateTaskStatusHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableTitle title={task.title} changeTitle={updateTaskTitleHandler}/>
            <IconButton disabled={task.entityStatus === "loading"} color='secondary' className={"IconButton"}>
                <DeleteIcon onClick={removeTaskHandler}/>
            </IconButton>
        </li>
    );
});

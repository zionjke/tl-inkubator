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
    todolistId: string
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {
        task,
        todolistId,
    } = props

    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => dispatch(removeTask({todolistId, taskId:task.id})), [dispatch, todolistId, task.id])
    const updateTaskStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => dispatch(updateTask({todolistId, taskId:task.id, domainModel:{status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}})),
        [dispatch, todolistId, task.id])
    const updateTaskTitleHandler = useCallback((title: string) => dispatch(updateTask({todolistId, taskId:task.id, domainModel: {title}})), [dispatch, todolistId, task.id])


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

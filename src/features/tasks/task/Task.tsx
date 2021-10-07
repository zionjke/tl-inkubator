import * as React from 'react';
import {ChangeEvent, useCallback} from 'react';
import {EditableTitle} from "../../../components/EditableTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {TaskDomainType} from "../tasks-reducer";
import {TaskStatuses} from "../../../api/tasks-api";
import {useActions} from "../../../hooks/useActions";
import {tasksAction} from "../index";


export type TaskPropsType = {
    task: TaskDomainType
    todolistId: string
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {
        task,
        todolistId,
    } = props

    const {updateTask,removeTask} = useActions(tasksAction)

    const removeTaskHandler = useCallback(() => removeTask({
        todolistId,
        taskId: task.id
    }), [ todolistId, task.id])
    const updateTaskStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => updateTask({
            todolistId,
            taskId: task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        }),
        [ todolistId, task.id])
    const updateTaskTitleHandler = useCallback((title: string) => updateTask({
        todolistId,
        taskId: task.id,
        domainModel: {title}
    }), [ todolistId, task.id])


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

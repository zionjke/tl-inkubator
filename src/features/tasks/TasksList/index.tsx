import * as React from 'react';
import {FilterValuesType} from '../../todolists/todolists-reducer';
import {Task} from "../Task";
import {TaskDomainType} from "../tasks-reducer";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../store";
import {TaskStatuses} from "../../../api/tasks-api";
import {useEffect} from "react";
import {useActions} from "../../../hooks/useActions";
import {tasksAction} from "../index";

type Props = {
    todolistId: string
    todolistFilter: FilterValuesType

};
export const TasksList = (props: Props) => {

    const {fetchTasks} = useActions(tasksAction)

    const {
        todolistFilter,
        todolistId
    } = props

    const tasks = useSelector<GlobalStateType, TaskDomainType[]>(state => {
        return state.tasks[todolistId]
    })

    let filteredTasks = tasks.filter(task => {
        switch (todolistFilter) {
            case "All":
                return task
            case "Active":
                return task.status === TaskStatuses.New
            case "Completed":
                return task.status === TaskStatuses.Completed
            default:
                return task
        }
    });

    useEffect(() => {
        fetchTasks(todolistId)
    }, [todolistId])

    return (
        <ul style={{listStyle: 'none', paddingLeft: 0}}>
            {!filteredTasks.length ? <span>No tasks</span> :
                filteredTasks.map(task => (
                    <Task
                        key={task.id}
                        todolistId={todolistId}
                        task={task}/>
                ))
            }
        </ul>
    );
};

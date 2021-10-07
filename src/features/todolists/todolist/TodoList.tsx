import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../app/store";
import {TaskDomainType} from "../../tasks/tasks-reducer";
import {TodolistDomainType} from "../todolists-reducer";
import {EditableTitle} from "../../../components/EditableTitle";
import {TaskStatuses} from "../../../api/tasks-api";
import {useActions} from "../../../hooks/useActions";
import {tasksAction} from "../../tasks";
import {todolistsActions} from "../index";
import {TasksList} from "../../tasks/TasksList";


type Props = {
    todoList: TodolistDomainType
};

export const TodoList: React.FC<Props> = React.memo((props: Props) => {

    const {
        todoList
    } = props

    const {fetchTasks, createTask} = useActions(tasksAction)
    const {updateTodoListTitle, removeTodoList, changeTodolistFilter} = useActions(todolistsActions)

    const tasks = useSelector<GlobalStateType, TaskDomainType[]>(state => {
        return state.tasks[todoList.id]
    })

    let filteredTasks = tasks.filter(task => {
        switch (todoList.filter) {
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
        fetchTasks(todoList.id)
    }, [todoList.id])

    const createTaskHandler = useCallback((title: string) => createTask({
        todolistId: todoList.id,
        title
    }), [todoList.id])

    const updateTodolistTitleHandler = useCallback((title: string) => updateTodoListTitle({
        todolistID: todoList.id,
        title
    }), [todoList.id])
    const removeTodoListHandler = useCallback(() => removeTodoList(todoList.id), [todoList.id])

    const setAllFilter = useCallback(() => changeTodolistFilter({
        id: todoList.id,
        filter: 'All'
    }), [todoList.id])
    const setActiveFilter = useCallback(() => changeTodolistFilter({
        id: todoList.id,
        filter: 'Active'
    }), [todoList.id])
    const setCompletedFilter = useCallback(() => changeTodolistFilter({
        id: todoList.id,
        filter: 'Completed'
    }), [todoList.id])


    return (
        <div>
            <div className='todolistTitle'>
                <h3>
                    <EditableTitle changeTitle={updateTodolistTitleHandler} title={todoList.title}/>
                </h3>
                <IconButton disabled={todoList.entityStatus === "loading"} color='secondary' className={"iconButton"}>
                    <DeleteIcon onClick={removeTodoListHandler}/>
                </IconButton>
            </div>
            <AddItemForm addItem={createTaskHandler}
                         disabled={todoList.entityStatus === "loading"}/>
            <TasksList filteredTasks={filteredTasks}
                       todolistId={todoList.id}/>
            <div>
                <Button onClick={setAllFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'All' ? 'primary' : 'default'}>
                    All
                </Button>
                <Button onClick={setActiveFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'Active' ? 'primary' : 'default'}>
                    Active
                </Button>
                <Button onClick={setCompletedFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'Completed' ? 'primary' : 'default'}>
                    Completed
                </Button>
            </div>
        </div>
    );

});

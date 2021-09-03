import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../../app/store";
import {createTask, fetchTasks, TaskDomainType} from "../tasks-reducer";
import {
    updateTodoListFilterActionCreator,
    removeTodoList,
    TodolistDomainType, updateTodoListTitle,
} from "../todolists-reducer";
import {Task} from "./task/Task";
import {EditableTitle} from "../../../components/EditableTitle";
import {TaskStatuses} from "../../../api/tasks-api";


type Props = {
    todoList: TodolistDomainType
};

export const TodoList: React.FC<Props> = React.memo((props: Props) => {
    const {
        todoList
    } = props

    const tasks = useSelector<GlobalStateType, TaskDomainType[]>(state => {
        return state.tasks[todoList.id]
    })
    const dispatch = useDispatch()

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
        dispatch(fetchTasks(todoList.id))
    }, [dispatch, todoList.id])

    const createTaskHandler = useCallback((title: string) => dispatch(createTask(todoList.id, title)), [dispatch, todoList.id])

    const updateTodolistTitleHandler = useCallback((title: string) => dispatch(updateTodoListTitle(todoList.id, title)), [dispatch, todoList.id])
    const removeTodoListHandler = useCallback(() => dispatch(removeTodoList(todoList.id)), [dispatch, todoList.id])

    const setAllFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'All')), [dispatch, todoList.id])
    const setActiveFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'Active')), [dispatch, todoList.id])
    const setCompletedFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'Completed')), [dispatch, todoList.id])


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
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {
                    filteredTasks.map(task => (
                        <Task
                            key={task.id}
                            todoListID={todoList.id}
                            task={task}/>
                    ))
                }
            </ul>
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

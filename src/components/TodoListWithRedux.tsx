import React, {useCallback, useEffect} from 'react';
import {TaskStatuses, TaskType} from "../types/types";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "./AddItemForm/AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../state/store";
import {createTask, fetchTasks} from "../state/tasks-reducer";
import {
    updateTodoListFilterActionCreator,
    removeTodoList,
    TodolistDomainType, updateTodoListTitle,
} from "../state/todolists-reducer";
import {TaskWithRedux} from "./Task/TaskWithRedux";



type Props = {
    todoList: TodolistDomainType
};

export const TodoListWithRedux: React.FC<Props> = React.memo((props: Props) => {
    const {
        todoList
    } = props

    const tasks = useSelector<GlobalStateType, TaskType[]>(state => {
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
    }, [dispatch,todoList.id])

    const createTaskHandler = useCallback((title: string) => dispatch(createTask(todoList.id, title)), [dispatch, todoList.id])

    const updateTodolistTitleHandler = useCallback((title: string) => dispatch(updateTodoListTitle(todoList.id, title)), [dispatch, todoList.id])
    const removeTodoListHandler = useCallback(() => dispatch(removeTodoList(todoList.id)), [dispatch, todoList.id])

    const setAllFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'All')), [dispatch, todoList.id])
    const setActiveFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'Active')), [dispatch, todoList.id])
    const setCompletedFilter = useCallback(() => dispatch(updateTodoListFilterActionCreator(todoList.id, 'Completed')), [dispatch, todoList.id])


    return (
        <div>
            <div className='todolistTitle'>
                <TodolistTitle changeTodolistTitle={updateTodolistTitleHandler}
                               title={todoList.title}/>
                <IconButton color='secondary' className={"iconButton"}>
                    <DeleteIcon onClick={removeTodoListHandler}/>
                </IconButton>
            </div>
            <AddItemForm addItem={createTaskHandler}/>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {
                    filteredTasks.map(task => (
                        <TaskWithRedux
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

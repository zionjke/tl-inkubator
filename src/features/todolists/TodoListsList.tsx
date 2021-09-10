import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../../app/store";
import {createTodoList, fetchTodoLists, TodolistDomainType} from "./todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm";
import {Paper} from "@material-ui/core";
import {TodoList} from "./todolist/TodoList";
import { Redirect } from 'react-router-dom';

type TodoListsListProps = {}
export const TodoListsList: React.FC = (props: TodoListsListProps): React.ReactElement => {
    const todoLists = useSelector<GlobalStateType, TodolistDomainType[]>(state => state.todoLists)
    const isAuth = useSelector<GlobalStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const createNewTodoListHandler = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [dispatch])

    if(!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <AddItemForm addItem={createNewTodoListHandler}/>
            <div className='todolists'>
                {
                    todoLists.map(tl =>
                        <Paper key={tl.id} elevation={3} style={{padding: "15px"}}>
                            <TodoList todoList={tl}/>
                        </Paper>
                    )
                }
            </div>
        </>
    );
};
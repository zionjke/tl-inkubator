import React, {useCallback, useEffect} from 'react';
import {useSelector} from "react-redux";
import {GlobalStateType} from "../../../store";
import {TodolistDomainType} from "../todolists-reducer";
import {AddItemForm} from "../../../components/AddItemForm";
import {Paper} from "@material-ui/core";
import {Todolist} from "../Todolist";
import {Redirect} from 'react-router-dom';
import {authSelectors} from "../../auth";
import {useActions} from "../../../hooks/useActions";
import {todolistsActions} from "../index";

type TodoListsListProps = {}
export const TodolistsList: React.FC = (props: TodoListsListProps): React.ReactElement => {

    const todoLists = useSelector<GlobalStateType, TodolistDomainType[]>(state => state.todoLists)
    const isAuth = useSelector(authSelectors.selectIsAuth)
    const {createTodoList,fetchTodoLists} = useActions(todolistsActions)

    const createNewTodoListHandler = useCallback((title: string) => {
        createTodoList(title)
    }, [])


    useEffect(() => {
        fetchTodoLists()
    }, [])

    if(!isAuth) {
        return <Redirect to={'/auth'}/>
    }

    return (
        <>
            <AddItemForm addItem={createNewTodoListHandler}/>
            <div className='todolists'>
                {
                    todoLists.map(tl =>
                        <Paper key={tl.id} elevation={3} style={{padding: "15px"}}>
                            <Todolist todoList={tl}/>
                        </Paper>
                    )
                }
            </div>
        </>
    );
};
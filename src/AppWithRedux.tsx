import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Paper} from "@material-ui/core";
import {
    createTodoListThunkCreator, fetchTodoLists,
    TodolistDomainType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "./state/store";
import {TodoListWithRedux} from "./components/TodoListWithRedux";



function AppWithRedux() {
    const todoLists = useSelector<GlobalStateType, TodolistDomainType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const addNewTodoList = useCallback((title: string) => {
        dispatch(createTodoListThunkCreator(title))
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodoList}/>
            <div className='todolists'>
                {
                    todoLists &&
                    todoLists.map(tl =>
                        <Paper key={tl.id} elevation={3} style={{padding: "15px"}}>
                            <TodoListWithRedux todoList={tl}/>
                        </Paper>
                    )
                }
            </div>
        </div>
    );
}

export default AppWithRedux

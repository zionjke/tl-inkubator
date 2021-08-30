import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {Paper} from "@material-ui/core";
import {addTodoListActionCreator, setTodolistActionCreator, TodolistDomainType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "./state/store";
import {TodoListWithRedux} from "./components/TodoListWithRedux";
import {TodoListsApi} from "./api/todolists-api";


 function AppWithRedux() {
    const todoLists = useSelector<GlobalStateType, TodolistDomainType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const addNewTodoList = useCallback((title: string) => {
        dispatch(addTodoListActionCreator(title))
    }, [dispatch])

    const setTodoLists = async () => {
        try {
            let {data} = await TodoListsApi.getTodoLists()
            dispatch(setTodolistActionCreator(data))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setTodoLists()
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

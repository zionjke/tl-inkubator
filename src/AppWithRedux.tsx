import React, {useCallback} from 'react';
import './App.css';
import {TodoListType} from './types/types';
import {AddItemForm} from "./components/AddItemForm";
import {Paper} from "@material-ui/core";
import {addTodoListActionCreator} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "./state/store";
import {TodoListWithRedux} from "./components/TodoListWithRedux";


function AppWithRedux() {
    console.log('App called')
    const todoLists = useSelector<GlobalStateType, TodoListType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const addNewTodoList = useCallback((title: string) => {
            dispatch(addTodoListActionCreator(title))
        }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodoList}/>
            <div className='todolists'>
                {
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

export default AppWithRedux;

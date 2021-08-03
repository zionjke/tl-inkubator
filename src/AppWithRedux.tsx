import React from 'react';
import './App.css';
import {TodoListType} from './types/types';
import {AddItemForm} from "./components/AddItemForm";
import {Paper} from "@material-ui/core";
import {addTodoListActionCreator,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "./state/store";
import {TodoListWithRedux} from "./components/TodoListWithRedux";


function AppWithRedux() {

    const todoLists = useSelector<GlobalStateType, TodoListType[]>(state => state.todoLists)
    const dispatch = useDispatch()

    const addNewTodoList = (title: string) => {
        dispatch(addTodoListActionCreator(title))
    }
    // const removeTodoList = (todolistID: string) => {
    //     dispatch(removeTodoListActionCreator(todolistID))
    // }
    // const changeTodolistTitle = (title: string, todolistID: string) => {
    //     dispatch(changeTodoListTitleActionCreator(todolistID, title))
    // }
    // const changeTodolistFilter = (newFilter: FilterValuesType, todolistID: string) => {
    //     dispatch(changeTodoListFilterActionCreator(todolistID, newFilter))
    // }
    //
    // const addNewTask = (title: string, todolistID: string): void => {
    //     dispatch(addNewTaskActionCreator(todolistID, title))
    // }
    // const changeTaskStatus = (taskId: string, todolistID: string, status: boolean): void => {
    //     dispatch(changeTaskStatusActionCreator(todolistID, taskId, status))
    // }
    // const removeTask = (taskId: string, todolistID: string): void => {
    //     dispatch(removeTaskActionCreator(todolistID, taskId))
    // }
    // const changeTaskTitle = (title: string, todolistID: string, taskID: string) => {
    //     dispatch(changeTaskTitleActionCreator(todolistID, taskID, title))
    // }

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodoList}/>
            <div className='todolists'>
                {
                    todoLists.map(tl =>
                        <Paper key={tl.id} elevation={3} style={{padding: "15px"}}>
                            <TodoListWithRedux todolistID={tl.id}/>
                        </Paper>
                    )
                }
            </div>
        </div>
    );
}

export default AppWithRedux;
import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {FilterValuesType, TaskStateType, TodoListType} from './types/types';
import {AddItemForm} from "./components/AddItemForm";
import {Paper} from "@material-ui/core";
import {
    addTodoListActionCreator, changeTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator,
} from "./state/todolists-reducer";
import {
    addNewTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "./state/store";


function AppWithRedux() {

    const todoLists = useSelector<GlobalStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<GlobalStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addNewTodoList = (title: string) => {
        dispatch(addTodoListActionCreator(title))
    }
    const removeTodoList = (todolistID: string) => {
        dispatch(removeTodoListActionCreator(todolistID))
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatch(changeTodoListTitleActionCreator(todolistID, title))
    }
    const changeTodolistFilter = (newFilter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodoListFilterActionCreator(todolistID, newFilter))
    }

    const addNewTask = (title: string, todolistID: string): void => {
        dispatch(addNewTaskActionCreator(todolistID, title))
    }
    const changeTaskStatus = (taskId: string, todolistID: string, status: boolean): void => {
        dispatch(changeTaskStatusActionCreator(todolistID, taskId, status))
    }
    const removeTask = (taskId: string, todolistID: string): void => {
        dispatch(removeTaskActionCreator(todolistID, taskId))
    }
    const changeTaskTitle = (title: string, todolistID: string, taskID: string) => {
        dispatch(changeTaskTitleActionCreator(todolistID, taskID, title))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addNewTodoList}/>
            <div className='todolists'>
                {
                    todoLists.map(tl => {
                        let filteredTasks = tasks[tl.id].filter(task => {
                            switch (tl.filter) {
                                case "All":
                                    return task
                                case "Active":
                                    return !task.isDone
                                case "Completed":
                                    return task.isDone
                                default:
                                    return task
                            }
                        })
                        return (
                            <Paper key={tl.id} elevation={3} style={{padding: "15px"}}>
                                <TodoList todolistID={tl.id}
                                          filter={tl.filter}
                                          tasks={filteredTasks}
                                          title={tl.title}
                                          addNewTask={addNewTask}
                                          removeTodoList={removeTodoList}
                                          removeTask={removeTask}
                                          changeTaskStatus={changeTaskStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                          changeTodolistFilter={changeTodolistFilter}
                                />
                            </Paper>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default AppWithRedux;

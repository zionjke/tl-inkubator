//@ts-nocheck

import React, {useEffect, useReducer} from 'react';
import '../app/App.css';
import {TodoList} from "./components/TodoListWithUseState";
import {FilterValuesType} from './types/types';
import {AddItemForm} from "./components/Index/Index";
import {Paper} from "@material-ui/core";
import {
    createTodoListActionCreator, updateTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addNewTaskActionCreator,
    changeTaskStatusActionCreator, changeTaskTitleActionCreator,
    removeTaskActionCreator,
    tasksReducer
} from "./state/tasks-reducer";
import {v1} from "uuid";


function AppWithReducers() {

    const [todoLists, setTodoLists] = useReducer(todolistsReducer, [
        {id: 'todolistID_1', title: 'What to learn', filter: 'All'},
        {id: 'todolistID_2', title: 'What to learn part 2', filter: "All"}
    ]);

    const [tasks, setTasks] = useReducer(tasksReducer, {
        ['todolistID_1']: [
            {id: v1(), title: 'Learn HTML', isDone: true},
            {id: v1(), title: 'Learn CSS', isDone: false},
            {id: v1(), title: 'Learn JS', isDone: false},
        ],
        ['todolistID_2']: [
            {id: v1(), title: 'Learn React', isDone: true},
            {id: v1(), title: 'Learn Redux', isDone: false},
            {id: v1(), title: 'Learn NodeJS', isDone: false},
        ],
    });

    const addNewTodoList = (title: string) => {
        let action = createTodoListActionCreator(title) // ложим AC в переменную чтобы не вызывать ее два раза т.к будет создаватся два ID
        setTodoLists(action)
        setTasks(action)
    }
    const removeTodoList = (todolistID: string) => {
        let action = removeTodoListActionCreator(todolistID)
        setTodoLists(action)
        setTasks(action)
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        setTodoLists(changeTodoListTitleActionCreator(todolistID, title))
    }
    const changeTodolistFilter = (newFilter: FilterValuesType, todolistID: string) => {
        setTodoLists(updateTodoListFilterActionCreator(todolistID, newFilter))
    }

    const addNewTask = (title: string, todolistID: string): void => {
        setTasks(addNewTaskActionCreator(todolistID, title))
    }
    const changeTaskStatus = (taskId: string, todolistID: string, status: boolean): void => {
        setTasks(changeTaskStatusActionCreator(todolistID, taskId, status))
    }
    const removeTask = (taskId: string, todolistID: string): void => {
        setTasks(removeTaskActionCreator(todolistID, taskId))
    }
    const changeTaskTitle = (title: string, todolistID: string, taskID: string) => {
        setTasks(changeTaskTitleActionCreator(todolistID, taskID, title))
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

export default AppWithReducers;

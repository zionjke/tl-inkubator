import React, {useEffect, useReducer} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {FilterValuesType} from './types/types';
import {AddItemForm} from "./components/AddItemForm";
import {Paper} from "@material-ui/core";
import {
    addTodoListActionCreator, changeTodoListFilterActionCreator,
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

    console.log(todoLists)
    console.log(tasks)


    useEffect(() => {
        const tasks = localStorage.getItem('tasks')
        const todoLists = localStorage.getItem('todoLists')
        if (tasks) {
            setTasks(JSON.parse(tasks))
        }
        if (todoLists) {
            setTodoLists(JSON.parse(todoLists))
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        localStorage.setItem('todoLists', JSON.stringify(todoLists))
    }, [todoLists, tasks])


    const addNewTodoList = (title: string) => {
        let action = addTodoListActionCreator(title) // ложим AC в переменную чтобы не вызывать ее два раза
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
        setTodoLists(changeTodoListFilterActionCreator(todolistID, newFilter))
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
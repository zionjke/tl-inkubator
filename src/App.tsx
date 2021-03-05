import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./components/TodoList";
import {FilterValuesType, TaskStateType, TaskType, TodoListType} from './types/types';


function App() {


    const [todoTitle, setTodoTitle] = useState<string>('')
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        // {id: todolistID_1, title: 'What to learn', filter: 'All'},
        // {id: todolistID_2, title: 'What to learn part 2', filter: "All"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        // [todolistID_1]: [
        //     {id: v1(), title: 'Learn HTML', isDone: true},
        //     {id: v1(), title: 'Learn CSS', isDone: false},
        //     {id: v1(), title: 'Learn JS', isDone: false},
        // ],
        // [todolistID_2]: [
        //     {id: v1(), title: 'Learn React', isDone: true},
        //     {id: v1(), title: 'Learn Redux', isDone: false},
        //     {id: v1(), title: 'Learn NodeJS', isDone: false},
        // ],
    })

    const addNewTodoList = () => {
        if (todoTitle !== '') {
            let newTodoList: TodoListType = {
                id: v1(),
                title: todoTitle,
                filter: "All"
            }
            tasks[newTodoList.id] = []
            setTodoLists([...todoLists, newTodoList])
            setTodoTitle('')
        }
    }

    const removeTodoList = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }


    const addNewTask = (title: string, todolistID: string): void => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistID] = [...tasks[todolistID], newTask]
        setTasks({...tasks})
    }


    const changeTaskStatus = (taskId: string, todolistID: string, status: boolean): void => {
        const task = tasks[todolistID].find(task => task.id === taskId)
        if (task) {
            task.isDone = status
            setTasks({...tasks})
        }
    }

    const removeTask = (taskId: string, todolistID: string): void => {
        tasks[todolistID] = tasks[todolistID].filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    const changeTodolistFilter = (newFilter: FilterValuesType, todolistID: string) => {
        const todolist = todoLists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = newFilter
            setTodoLists([...todoLists])
        }
    }


    return (
        <div className="App">
            <input onChange={(e) => setTodoTitle(e.currentTarget.value)}
                   value={todoTitle}
                   type="text"/>
            <button onClick={addNewTodoList}>+</button>
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
                            <TodoList key={tl.id}
                                      id={tl.id}
                                      filter={tl.filter}
                                      tasks={filteredTasks}
                                      title={tl.title}
                                      addNewTask={addNewTask}
                                      removeTodoList={removeTodoList}
                                      removeTask={removeTask}
                                      changeTaskStatus={changeTaskStatus}
                                      changeTodolistFilter={changeTodolistFilter}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default App;

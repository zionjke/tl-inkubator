import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type TaskType = {
    title: string,
    id: number,
    isDone: boolean
}

export type FilterValuesType = 'All' | 'Completed' | 'Active'

function App() {

    const [tasks, setTasks] = React.useState<Array<TaskType>>([
        {id: 1, title: 'Learn JS', isDone: false},
        {id: 2, title: 'Learn React', isDone: false},
        {id: 3, title: 'Learn HTML&CSS', isDone: false},
    ])

    const [filter, setFilter] = React.useState<FilterValuesType>('All')

    const changeFilter = (newFilterValue:FilterValuesType) => {
        setFilter(newFilterValue)
    }



    let filteredTasksWithFilter = tasks.filter(task => {
        switch (filter) {
            case "All": return task
            case "Active": return !task.isDone
            case "Completed": return task.isDone
        }
    })





    const addNewTask = (title: string) => {
        let newTask = {
            id: tasks[tasks.length - 1].id + 1,
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
        console.log(tasks)
    }

    const changeTaskStatus = (taskId: number, status: boolean) => {
        let filteredTasks = tasks.filter(task => {
            if (task.id === taskId) {
                task.isDone = status
                return task
            } else {
                return task
            }
        })
        setTasks(filteredTasks)
        console.log(tasks)
    }

    const removeTask = (taskId: number): void => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
        console.log(tasks)
    }

    return (
        <div className="App">
            <TodoList removeTask={removeTask}
                      addNewTask={addNewTask}
                      changeTaskStatus={changeTaskStatus}
                      tasks={filteredTasksWithFilter}
                      changeFilter={changeFilter}
                      title={'What to Learn'}/>
            {/*<TodoList tasks={tasksTwo} title={'What to Buy'}/>*/}
        </div>
    );
}

export default App;

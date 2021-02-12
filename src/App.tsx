import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type TaskType = {
    title: string,
    id: number,
    isDone: boolean
}

function App() {
    const [tasks,setTasks] = React.useState<Array<TaskType>>([
        {id: 1, title: 'Learn JS', isDone: false},
        {id: 2, title: 'Learn React', isDone: false},
        {id: 3, title: 'Learn HTML&CSS', isDone: false},
    ])
    // let tasksOne: Array<TaskType> = [
    //     {id: 1, title: 'Learn JS', isDone: false},
    //     {id: 2, title: 'Learn React', isDone: false},
    //     {id: 3, title: 'Learn HTML&CSS', isDone: false},
    // ]

    // const tasksTwo: Array<TaskType> = [
    //     {id: 1, title: 'Milk', isDone: false},
    //     {id: 2, title: 'Coffee', isDone: true},
    //     {id: 3, title: 'Bread', isDone: false},
    // ]

    const removeTask = (taskId: number): void => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
        console.log(tasks)
    }

    return (
        <div className="App">
            <TodoList removeTask={removeTask} tasks={tasks} title={'What to Learn'}/>
            {/*<TodoList tasks={tasksTwo} title={'What to Buy'}/>*/}
        </div>
    );
}

export default App;

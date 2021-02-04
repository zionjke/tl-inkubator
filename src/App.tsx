import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

export type TaskType = {
    title: string,
    id: number,
    isDone: boolean
}

function App() {
    const tasksOne: Array<TaskType> = [
        {id: 1, title: 'Learn JS', isDone: false},
        {id: 2, title: 'Learn React', isDone: false},
        {id: 3, title: 'Learn HTML&CSS', isDone: false},
    ]

    const tasksTwo: Array<TaskType> = [
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Coffee', isDone: true},
        {id: 3, title: 'Bread', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList tasks={tasksOne} title={'What to Learn'}/>
            <TodoList tasks={tasksTwo} title={'What to Buy'}/>
        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import {TodoListsList} from "../features/todolists/TodoListsList";
import ErrorSnackBar from "../components/ErrorSnackBar";
import {Header} from "../components/Header";


function App() {
    return (
        <div className="App">
            <Header/>
            <TodoListsList/>
            <ErrorSnackBar/>
        </div>
    );
}

export default App

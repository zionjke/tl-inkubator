import React from 'react';
import './App.css';
import {TodoListsList} from "../features/todolists/TodoListsList";
import {AppBar, Button, LinearProgress, Toolbar} from '@material-ui/core';
import {Alert} from "@material-ui/lab";
import ErrorSnackBar from "../components/ErrorSnackBar";



function App() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <LinearProgress />
            <TodoListsList/>
            <ErrorSnackBar/>
        </div>
    );
}

export default App

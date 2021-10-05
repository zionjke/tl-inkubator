import React, {useEffect} from 'react';
import './App.css';
import {TodoListsList} from "../features/todolists/TodoListsList";
import ErrorSnackBar from "../components/ErrorSnackBar";
import {Header} from "../components/Header";
import {Route, Switch} from 'react-router-dom';
import {Login} from "../features/login/Login";
import {CircularProgress, Container} from '@material-ui/core';
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./app-reducer";
import { selectIsInitialized } from './selectors';



function App() {
    const isInitialized = useSelector(selectIsInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!isInitialized) {
        return (
            <div className='circularProgress'>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div className="App">
            <Header/>
            <Container>
                <Switch>
                    <Route exact path={'/'} component={TodoListsList}/>
                    <Route exact path={'/login'} component={Login}/>
                </Switch>
            </Container>
            <ErrorSnackBar/>
        </div>
    );
}

export default App

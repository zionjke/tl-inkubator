import React, {useEffect} from 'react';
import './App.css';
import {TodoListsList} from "../features/todolists/TodoListsList";
import ErrorSnackBar from "../components/ErrorSnackBar";
import {Header} from "../components/Header";
import {Route, Switch} from 'react-router-dom';
import {Login} from "../features/auth/Login";
import {CircularProgress, Container} from '@material-ui/core';
import {useSelector} from "react-redux";
import {selectIsInitialized} from './selectors';
import {useActions} from "../hooks/useActions";
import {appActions} from "./index";


function App() {

    const isInitialized = useSelector(selectIsInitialized)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        initializeApp()
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
                    <Route exact path={'/auth'} component={Login}/>
                </Switch>
            </Container>
            <ErrorSnackBar/>
        </div>
    );
}

export default App

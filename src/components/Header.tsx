import React, {useCallback} from 'react';
import {AppBar, Button, LinearProgress, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../features/auth/auth-reducer";
import {authSelectors} from "../features/auth";
import {appSelectors} from "../app";

type Props = {};

export const Header = React.memo((props: Props) => {

    const isAuth = useSelector(authSelectors.selectIsAuth)
    const status = useSelector(appSelectors.selectStatus)
    const dispatch = useDispatch()

    const logOutHandler = useCallback(() => dispatch(logOut()), [dispatch])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    {
                        isAuth &&
                        <Button onClick={logOutHandler} color="inherit">Выйти</Button>
                    }
                </Toolbar>
            </AppBar>
            {
                status === "loading" &&
                <LinearProgress color={"secondary"}/>
            }
        </div>
    );
});

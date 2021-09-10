import React, {useCallback} from 'react';
import {AppBar, Button, LinearProgress, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../app/store";
import {AppStatusesType} from "../app/app-reducer";
import {logOut} from "../features/login/auth-reducer";

type Props = {};

export const Header = React.memo((props: Props) => {
    const isAuth = useSelector<GlobalStateType, boolean>(state => state.auth.isAuth)
    const status = useSelector<GlobalStateType, AppStatusesType>(state => state.app.status)
    const dispatch = useDispatch()

    const logOutHandler = useCallback(() => dispatch(logOut()), [dispatch])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    {isAuth && <Button onClick={logOutHandler} color="inherit">Выйти</Button>}
                </Toolbar>
            </AppBar>
            {
                status === "loading" &&
                <LinearProgress color={"secondary"}/>
            }
        </div>
    );
});

import React, {useCallback} from 'react';
import {AppBar, Button, LinearProgress, Toolbar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {authActions, authSelectors} from "../../features/auth";
import {appSelectors} from "../../app";
import {useActions} from "../../hooks/useActions";

type Props = {};

export const Header = React.memo((props: Props) => {

    const isAuth = useSelector(authSelectors.selectIsAuth)
    const status = useSelector(appSelectors.selectStatus)
    const {logOut} = useActions(authActions)

    const logOutHandler = useCallback(() =>logOut(), [])

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

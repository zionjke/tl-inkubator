import React, {useCallback} from 'react';
import {AppBar, Button, LinearProgress, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../features/login/auth-reducer";

import {selectStatus} from "../app/selectors";
import { selectIsAuth } from '../features/login/sectors';

type Props = {};

export const Header = React.memo((props: Props) => {
    const isAuth = useSelector(selectIsAuth)
    const status = useSelector(selectStatus)
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

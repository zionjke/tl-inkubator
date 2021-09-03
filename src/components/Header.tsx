import React from 'react';
import {AppBar, Button, LinearProgress, Toolbar} from "@material-ui/core";
import {useSelector} from "react-redux";
import {GlobalStateType} from "../app/store";
import {AppStatusesType} from "../app/app-reducer";

type Props = {};

export const Header = (props: Props) => {
    const status = useSelector<GlobalStateType, AppStatusesType>(state => state.app.status)
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {
                status === "loading" &&
                <LinearProgress color={"secondary"}/>
            }
        </div>
    );
};

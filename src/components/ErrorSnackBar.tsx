import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../app/store";
import { setAppError } from '../app/app-reducer';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ErrorSnackBar() {
    const classes = useStyles();
    const error = useSelector<GlobalStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setAppError(null))
    };

    return (
        <div className={classes.root}>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}

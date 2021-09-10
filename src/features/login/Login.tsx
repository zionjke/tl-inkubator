import {Button, Checkbox} from '@material-ui/core';
import {FormGroup, Grid, TextField, FormControlLabel} from '@material-ui/core';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "./auth-reducer";
import {GlobalStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';


export const Login: FC = () => {
    const isAuth = useSelector<GlobalStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: Yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        rememberMe: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            dispatch(login(data))
        },
    });

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    return (
        <Grid container justify="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            {...formik.getFieldProps('email')}
                            label="Email"
                            margin="normal"
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}/>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}/>
                        <FormControlLabel
                            label="Rememeber me"
                            control={<Checkbox id="rememberMe"
                                               name="rememberMe"
                                               onChange={formik.handleChange}
                                               checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={"primary"}>Login</Button>
                    </FormGroup>
                </form>
            </Grid>
        </Grid>
    );
};
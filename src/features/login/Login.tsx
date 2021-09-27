import {Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField} from '@material-ui/core';
import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import React, {FC} from 'react';
import {useSelector} from "react-redux";
import {login} from "./auth-reducer";
import {GlobalStateType, useAppDispatch} from "../../app/store";
import {Redirect} from 'react-router-dom';
import {LoginParamsType} from "../../api/auth-api";


export const Login: FC = () => {
    const isAuth = useSelector<GlobalStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

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
        // onSubmit: (data) => {
        //     dispatch(login(data))
        // },
        onSubmit: async (data, formikHelpers: FormikHelpers<LoginParamsType>) => {
            const action = await dispatch(login(data))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors) {
                    const error = action.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });

    if (isAuth) {
        return <Redirect to={'/'}/>
    }

    console.log(isAuth)

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
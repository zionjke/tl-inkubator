// @flow
import * as React from 'react';
import {ChangeEvent} from "react";


type Props = {
    title:string
    isDone: boolean
};
export const Task = ({title,isDone}: Props) => {
    const [status, setStatus] = React.useState<boolean>(isDone);

    const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>):void =>  {
        setStatus(e.currentTarget.checked)
    }

    return (
        <li>
            <input onChange={changeTaskStatus} type="checkbox" checked={status}/>
            <span>{title}</span>
        </li>
    );
};

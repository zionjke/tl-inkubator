// @flow
import * as React from 'react';
import {ChangeEvent} from "react";


type Props = {
    id:number
    title:string
    isDone: boolean
    removeTask: (taskID:number) => void
};
export const Task = ({title,isDone,removeTask,id}: Props) => {
    const [status, setStatus] = React.useState<boolean>(isDone);
    const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>):void =>  {
        setStatus(e.currentTarget.checked)
    }

    return (
        <li>
            <input onChange={changeTaskStatus} type="checkbox" checked={status}/>
            <span>{title}</span>
            <button onClick={() => removeTask(id)}>X</button>
        </li>
    );
};

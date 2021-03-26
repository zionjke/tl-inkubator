import React from 'react';
import {EditableTitle} from "./EditableTitle";

type Props = {
    title: string
    changeTodolistTitle: (title: string) => void
};

export const TodolistTitle: React.FC<Props> = (props) => {
    return (
        <h3>
            <EditableTitle changeTitle={props.changeTodolistTitle} title={props.title}/>
        </h3>
    )
}

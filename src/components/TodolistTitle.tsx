import React from 'react';
import {EditableTitle} from "./EditableTitle/EditableTitle";

type Props = {
    title: string
    changeTodolistTitle: (title: string) => void
};

export const TodolistTitle: React.FC<Props> = React.memo((props) => {
    const {
        title,
        changeTodolistTitle
    } = props
    return (
        <h3>
            <EditableTitle changeTitle={changeTodolistTitle} title={title}/>
        </h3>
    )
})

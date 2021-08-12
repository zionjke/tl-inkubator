import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type Props = {
    title: string
    changeTitle: (title: string) => void
};
export const EditableTitle: React.FC<Props> = React.memo((props: Props) => {
    console.log('EditableTitle called')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        if (title !== '') {
            props.changeTitle(title)
            setEditMode(false)
            setError(false)
        } else {
            setError(true)
        }
    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    return (
        <>
            {
                editMode
                    ? <TextField className={error ? 'error' : ''}
                                 onKeyPress={onKeyPressEnter}
                                 autoFocus
                                 value={title}
                                 error={error}
                                 helperText={error && 'Title Required'!}
                                 onChange={onChangeTitle}
                                 onBlur={deactivateEditMode}/>
                    : <span onDoubleClick={activateEditMode}>
                         {props.title}
                     </span>
            }

        </>
    );
});

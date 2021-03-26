import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type Props = {
    title: string
    changeTitle: (title: string) => void
};
export const EditableTitle = (props: Props) => {
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
                    ? <input className={error ? 'error' : ''}
                             onKeyPress={onKeyPressEnter}
                             autoFocus
                             value={title}
                             onChange={onChangeTitle}
                             onBlur={deactivateEditMode}/>
                    : <span onDoubleClick={activateEditMode}>
                         {props.title}
                     </span>
            }

        </>
    );
};

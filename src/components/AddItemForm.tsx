import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type Props = {
    addItem: (title:string) => void
};

export const AddItemForm: React.FC<Props> = ({addItem}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }


    const onKeyPressAddItem = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onAddNewItem()
        }
    }

    const onAddNewItem = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }

    }


    return (
        <div>
            <input className={error ? 'error' : ''}
                   onChange={changeTitleHandler}
                   onKeyPress={onKeyPressAddItem}
                   value={title}
                   type='text'/>
            <Button onClick={onAddNewItem}>
                Add
            </Button>
            {
                error && <p className={'errorMessage'}>{error}</p>
            }
        </div>

    );
};

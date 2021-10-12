import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {TextField} from "@material-ui/core";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
};

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem,disabled}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }


    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
        <div className="addItemForm">
            <TextField className={error ? 'error' : ''}
                       onChange={changeTitleHandler}
                       onKeyPress={onKeyPressAddItem}
                       disabled={disabled}
                       variant={"outlined"}
                       label={'Введите название'}
                       value={title}
                       error={!!error}
                       helperText={error && 'Title Required'!}
                       type='text'/>
            <IconButton onClick={onAddNewItem} disabled={disabled}  className={"iconButton"}>
                <AddCircleIcon color={"primary"} />
            </IconButton>
        </div>

    );
});

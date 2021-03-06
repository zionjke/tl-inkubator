import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import {TextField} from "@material-ui/core";

type Props = {
    addItem: (title: string) => void
};

export const AddItemForm: React.FC<Props> = ({addItem}) => {
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
        <div>
            <TextField className={error ? 'error' : ''}
                       onChange={changeTitleHandler}
                       onKeyPress={onKeyPressAddItem}
                       variant={"outlined"}
                       label={'Введите название'}
                       value={title}
                       error={!!error}
                       helperText={error && 'Title Required'!}
                       type='text'/>
            <IconButton className={"iconButton"}>
                <AddCircleIcon color={"primary"} onClick={onAddNewItem}/>
            </IconButton>
            {/*<Button onClick={onAddNewItem}>*/}
            {/*    Add*/}
            {/*</Button>*/}
            {/*{*/}
            {/*    error && <Alert severity="error">Title Required!</Alert>*/}
            {/*}*/}
        </div>

    );
};

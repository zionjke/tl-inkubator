import * as React from 'react';
import {ChangeEvent, KeyboardEvent} from "react";
import {Button} from "./Button";

type Props = {
    onChangeForInput: (e: ChangeEvent<HTMLInputElement>) => void
    onClickForButton: () => void
    className?: string
    onKeyPressForInput: (e: KeyboardEvent<HTMLInputElement>) => void
    value: string
    type: string
    error: string | null
};

export const AddItemForm: React.FC<Props> = ({onChangeForInput,
                                                 className,
                                                 onKeyPressForInput, value,
                                                 type,
                                                 onClickForButton,
                                                 error}) => {
    return (
        <div>
            <input className={className}
                   onChange={onChangeForInput}
                   onKeyPress={onKeyPressForInput}
                   value={value}
                   type={type}/>
            <Button  onClick={onClickForButton}>
                +
            </Button>
            {
                error && <p className={'errorMessage'}>{error}</p>
            }
        </div>

    );
};

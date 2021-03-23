import * as React from 'react';
import {ChangeEvent, KeyboardEvent} from "react";

type Props = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
    onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    value: string
    type: string
};

export const AddItemForm: React.FC<Props> = ({onChange, className, onKeyPress, value, type}) => {
    return (
        <input className={className}
               onChange={onChange}
               onKeyPress={onKeyPress}
               value={value}
               type={type}/>
    );
};

import React from "react";
import {Button} from "@material-ui/core";
import {FilterValuesType} from "../../features/todolists/todolists-reducer";

type Props = {
    selectedFilter: FilterValuesType
    onClick: () => void
    children: React.ReactNode
    buttonFilter: FilterValuesType
}

export const FilterButton:React.FC<Props> = ({selectedFilter,onClick,children,buttonFilter}:Props) => {
    return (
        <Button onClick={onClick} variant="contained" size={"small"}
                color={selectedFilter === buttonFilter ? 'primary' : 'default'}>
            {children}
        </Button>
    )
}

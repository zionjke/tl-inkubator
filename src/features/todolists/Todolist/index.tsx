import React, {useCallback} from 'react';
import {AddItemForm} from "../../../components/AddItemForm";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {EditableTitle} from "../../../components/EditableTitle";
import {useActions} from "../../../hooks/useActions";
import {tasksAction} from "../../tasks";
import {todolistsActions} from "../index";
import {TasksList} from "../../tasks/TasksList";
import {FilterButton} from "../../../components/FilterButton";


type Props = {
    todoList: TodolistDomainType
};

export const Todolist: React.FC<Props> = React.memo((props: Props) => {

    const {
        todoList
    } = props

    const {createTask} = useActions(tasksAction)
    const {updateTodoListTitle, removeTodoList, changeTodolistFilter} = useActions(todolistsActions)

    const createTaskHandler = useCallback((title: string) => createTask({
        todolistId: todoList.id,
        title
    }), [todoList.id])

    const updateTodolistTitleHandler = useCallback((title: string) => updateTodoListTitle({
        todolistID: todoList.id,
        title
    }), [todoList.id])
    const removeTodoListHandler = useCallback(() => removeTodoList(todoList.id), [todoList.id])


    const setFilter = (filter: FilterValuesType) => {
         changeTodolistFilter({id: todoList.id, filter: filter})
    }

    // const setAllFilter = useCallback(() => changeTodolistFilter({
    //     id: todoList.id,
    //     filter: 'All'
    // }), [todoList.id])
    // const setActiveFilter = useCallback(() => changeTodolistFilter({
    //     id: todoList.id,
    //     filter: 'Active'
    // }), [todoList.id])
    // const setCompletedFilter = useCallback(() => changeTodolistFilter({
    //     id: todoList.id,
    //     filter: 'Completed'
    // }), [todoList.id])


    return (
        <div className={"todolist"}>
            <div className='todolistTitle'>
                <h3  style={{wordWrap: "break-word"}}>
                    <EditableTitle changeTitle={updateTodolistTitleHandler} title={todoList.title}/>
                </h3>
                <IconButton  onClick={removeTodoListHandler}
                            disabled={todoList.entityStatus === "loading"}
                            color='secondary'
                            className={"deleteButton"}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={createTaskHandler}
                         disabled={todoList.entityStatus === "loading"}/>
            <TasksList todolistId={todoList.id} todolistFilter={todoList.filter}/>
            <div>
                <FilterButton onClick={() => setFilter("All")}
                              buttonFilter={"All"}
                              selectedFilter={todoList.filter}>
                    ALl
                </FilterButton>
                <FilterButton onClick={() => setFilter("Active")}
                              buttonFilter={"Active"}
                              selectedFilter={todoList.filter}>
                    Active
                </FilterButton>
                <FilterButton onClick={() => setFilter("Completed")}
                              buttonFilter={"Completed"}
                              selectedFilter={todoList.filter}>
                    Completed
                </FilterButton>
            </div>
        </div>
    );
});


import React from 'react';
import {FilterValuesType, TaskType, TodoListType} from "../types/types";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "./AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../state/store";
import {
    addNewTaskActionCreator,
} from "../state/tasks-reducer";
import {
    changeTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator
} from "../state/todolists-reducer";
import {TaskWithRedux} from "./TaskWithRedux";


type Props = {
    todolistID: string
    title: string
    filter: FilterValuesType
};

export const TodoListWithRedux: React.FC<Props> = (props) => {
    console.log('TodoListWithReduxComponent called')
    const {
        todolistID,
        title,
        filter
    } = props

    // const todo = useSelector<GlobalStateType, TodoListType>(state => {
    //     return state.todoLists.filter((tl: TodoListType) => tl.id === todolistID)[0]
    // })
    const tasks = useSelector<GlobalStateType, TaskType[]>(state => {
        return state.tasks[todolistID]
    })
    const dispatch = useDispatch()

    let filteredTasks = tasks.filter(task => {
        switch (filter) {
            case "All":
                return task
            case "Active":
                return !task.isDone
            case "Completed":
                return task.isDone
            default:
                return task
        }
    })


    const addNewTask = (title: string) => dispatch(addNewTaskActionCreator(todolistID, title))

    const changeTodolistTitle = (title: string) => dispatch(changeTodoListTitleActionCreator(todolistID, title))
    const removeTodoList = () => dispatch(removeTodoListActionCreator(todolistID))

    const setAllFilter = () => dispatch(changeTodoListFilterActionCreator(todolistID, 'All'))
    const setActiveFilter = () => dispatch(changeTodoListFilterActionCreator(todolistID, 'Active'))
    const setCompletedFilter = () => dispatch(changeTodoListFilterActionCreator(todolistID, 'Completed'))


    return (
        <div>
            <div className='todolistTitle'>
                <TodolistTitle changeTodolistTitle={changeTodolistTitle}
                               title={title}/>
                <IconButton color='secondary' className={"iconButton"} onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addNewTask}/>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {
                    filteredTasks.map(task => (
                        <TaskWithRedux
                            key={task.id}
                            todoListID={todolistID}
                            isDone={task.isDone}
                            title={task.title}
                            taskID={task.id}/>
                    ))
                }
            </ul>
            <div>
                <Button onClick={setAllFilter} variant="contained" size={"small"}
                        color={filter === 'All' ? 'primary' : 'default'}>
                    All
                </Button>
                <Button onClick={setActiveFilter} variant="contained" size={"small"}
                        color={filter === 'Active' ? 'primary' : 'default'}>
                    Active
                </Button>
                <Button onClick={setCompletedFilter} variant="contained" size={"small"}
                        color={filter === 'Completed' ? 'primary' : 'default'}>
                    Completed
                </Button>
            </div>
        </div>
    );


};

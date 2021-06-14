import React from 'react';
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../types/types";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "./AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


type Props = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addNewTask: (title: string, todolistID: string) => void
    removeTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, todolistID: string, status: boolean) => void
    changeTaskTitle: (title: string, todolistID: string, taskID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
    changeTodolistFilter: (newFilter: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
};

export const TodoList: React.FC<Props> = (props) => {

    const changeTaskStatusHandler = (taskID: string, status: boolean) => {
        props.changeTaskStatus(taskID, props.todolistID, status)
    }

    const changeTaskTitleHandler = (taskID: string, title: string) => {
        props.changeTaskTitle(title, props.todolistID, taskID)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todolistID)
    }

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(taskID, props.todolistID)
    }


    const onAddNewTask = (title: string) => {
        props.addNewTask(title, props.todolistID)
    }


    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todolistID)
    }

    const setAllFilter = () => props.changeTodolistFilter('All', props.todolistID)
    const setActiveFilter = () => props.changeTodolistFilter('Active', props.todolistID)
    const setCompletedFilter = () => props.changeTodolistFilter('Completed', props.todolistID)


    return (
        <div>
            <div className='todolistTitle'>
                <TodolistTitle changeTodolistTitle={changeTodolistTitleHandler}
                               title={props.title}/>
                <IconButton color='secondary' className={"iconButton"} onClick={onClickRemoveTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={onAddNewTask}/>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {
                    props.tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            removeTask={removeTaskHandler}
                            changeTaskTitle={changeTaskTitleHandler}
                            changeTaskStatus={changeTaskStatusHandler}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <Button onClick={setAllFilter} variant="contained" size={"small"}
                        color={props.filter === 'All' ? 'primary' : 'default'}>
                    All
                </Button>
                <Button onClick={setActiveFilter} variant="contained" size={"small"}
                        color={props.filter === 'Active' ? 'primary' : 'default'}>
                    Active
                </Button>
                <Button onClick={setCompletedFilter} variant="contained" size={"small"}
                        color={props.filter === 'Completed' ? 'primary' : 'default'}>
                    Completed
                </Button>
                {/*<Button onClick={setAllFilter} className={props.filter === 'All' ? 'activeButton' : ''}>All</Button>*/}
                {/*<Button onClick={setActiveFilter}*/}
                {/*        className={props.filter === 'Active' ? 'activeButton' : ''}>Active</Button>*/}
                {/*<Button onClick={setCompletedFilter}*/}
                {/*        className={props.filter === 'Completed' ? 'activeButton' : ''}>Completed</Button>*/}
            </div>
        </div>
    );
};

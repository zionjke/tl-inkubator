import React from 'react';
import { TaskType, TodoListType} from "../types/types";
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
};

export const TodoListWithRedux: React.FC<Props> = (props) => {
    const todo = useSelector<GlobalStateType, TodoListType>(state => {
        return state.todoLists.filter((tl: TodoListType) => tl.id === props.todolistID)[0]
    })
    const tasks = useSelector<GlobalStateType, TaskType[]>(state => {
        return state.tasks[todo.id]
    })
    const dispatch = useDispatch()

    let filteredTasks = tasks.filter(task => {
        switch (todo.filter) {
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


    const addNewTask = (title: string) => dispatch(addNewTaskActionCreator(todo.id, title))

    const changeTodolistTitle = (title: string) => dispatch(changeTodoListTitleActionCreator(todo.id, title))
    const removeTodoList = () => dispatch(removeTodoListActionCreator(todo.id))

    const setAllFilter = () => dispatch(changeTodoListFilterActionCreator(todo.id, 'All'))
    const setActiveFilter = () => dispatch(changeTodoListFilterActionCreator(todo.id, 'Active'))
    const setCompletedFilter = () => dispatch(changeTodoListFilterActionCreator(todo.id, 'Completed'))



        return (
            <div>
                <div className='todolistTitle'>
                    <TodolistTitle changeTodolistTitle={changeTodolistTitle}
                                   title={todo.title}/>
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
                                todoListID={todo.id}
                                id={task.id} />
                        ))
                    }
                </ul>
                <div>
                    <Button onClick={setAllFilter} variant="contained" size={"small"}
                            color={todo.filter === 'All' ? 'primary' : 'default'}>
                        All
                    </Button>
                    <Button onClick={setActiveFilter} variant="contained" size={"small"}
                            color={todo.filter === 'Active' ? 'primary' : 'default'}>
                        Active
                    </Button>
                    <Button onClick={setCompletedFilter} variant="contained" size={"small"}
                            color={todo.filter === 'Completed' ? 'primary' : 'default'}>
                        Completed
                    </Button>
                </div>
            </div>
        );


};

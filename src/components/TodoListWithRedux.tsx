import React, {useCallback, useEffect} from 'react';
import {TaskStatuses, TaskType} from "../types/types";
import {TodolistTitle} from "./TodolistTitle";
import {AddItemForm} from "./AddItemForm/AddItemForm";

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {GlobalStateType} from "../state/store";
import {addNewTaskActionCreator, setTasksActionCreator,} from "../state/tasks-reducer";
import {
    changeTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator, TodolistDomainType
} from "../state/todolists-reducer";
import {TaskWithRedux} from "./Task/TaskWithRedux";
import {tasksApi} from "../api/tasks-api";


type Props = {
    todoList: TodolistDomainType
};

export const TodoListWithRedux: React.FC<Props> = React.memo((props: Props) => {
    const {
        todoList
    } = props

    const tasks = useSelector<GlobalStateType, TaskType[]>(state => {
        return state.tasks[todoList.id]
    })
    const dispatch = useDispatch()

    let filteredTasks = tasks.filter(task => {
        switch (todoList.filter) {
            case "All":
                return task
            case "Active":
                return task.status === TaskStatuses.New
            case "Completed":
                return task.status === TaskStatuses.Completed
            default:
                return task
        }
    })
    const setTasks = async () => {
        try {
            let {data} = await tasksApi.getTasks(todoList.id)
            dispatch(setTasksActionCreator(todoList.id, data.items))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setTasks()
    }, [])

    const addNewTask = useCallback((title: string) => dispatch(addNewTaskActionCreator(todoList.id, title)), [dispatch, todoList.id])

    const changeTodolistTitle = useCallback((title: string) => dispatch(changeTodoListTitleActionCreator(todoList.id, title)), [dispatch, todoList.id])
    const removeTodoList = useCallback(() => dispatch(removeTodoListActionCreator(todoList.id)), [dispatch, todoList.id])

    const setAllFilter = useCallback(() => dispatch(changeTodoListFilterActionCreator(todoList.id, 'All')), [dispatch, todoList.id])
    const setActiveFilter = useCallback(() => dispatch(changeTodoListFilterActionCreator(todoList.id, 'Active')), [dispatch, todoList.id])
    const setCompletedFilter = useCallback(() => dispatch(changeTodoListFilterActionCreator(todoList.id, 'Completed')), [dispatch, todoList.id])


    return (
        <div>
            <div className='todolistTitle'>
                <TodolistTitle changeTodolistTitle={changeTodolistTitle}
                               title={todoList.title}/>
                <IconButton color='secondary' className={"iconButton"}>
                    <DeleteIcon onClick={removeTodoList}/>
                </IconButton>
            </div>
            <AddItemForm addItem={addNewTask}/>
            <ul style={{listStyle: 'none', paddingLeft: 0}}>
                {
                    filteredTasks.map(task => (
                        <TaskWithRedux
                            key={task.id}
                            todoListID={todoList.id}
                            task={task}/>
                    ))
                }
            </ul>
            <div>
                <Button onClick={setAllFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'All' ? 'primary' : 'default'}>
                    All
                </Button>
                <Button onClick={setActiveFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'Active' ? 'primary' : 'default'}>
                    Active
                </Button>
                <Button onClick={setCompletedFilter} variant="contained" size={"small"}
                        color={todoList.filter === 'Completed' ? 'primary' : 'default'}>
                    Completed
                </Button>
            </div>
        </div>
    );

});

import React from 'react';
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../types/types";
import {TodolistTitle} from "./TodolistTitle";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";


type Props = {
    todolistID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addNewTask: (title: string, todolistID: string) => void
    removeTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, todolistID: string, status: boolean) => void
    changeTodolistFilter: (newFilter: FilterValuesType, todolistID: string) => void
    removeTodoList: (todoListID: string) => void
};

export const TodoList: React.FC<Props> = ({
                                              title,
                                              tasks,
                                              addNewTask,
                                              todolistID,
                                              filter,
                                              removeTask,
                                              changeTaskStatus,
                                              changeTodolistFilter,
                                              removeTodoList
                                          }) => {


    const onChangeTaskStatusHandler = (taskID: string, status: boolean) => {
        changeTaskStatus(taskID, todolistID, status)
    }

    const removeTaskHandler = (taskID: string) => {
        removeTask(taskID, todolistID)
    }


    const onAddNewTask = (title:string) => {
            addNewTask(title, todolistID)
    }




    const onClickRemoveTodoList = () => {
        removeTodoList(todolistID)
    }

    const setAllFilter = () => changeTodolistFilter('All', todolistID)
    const setActiveFilter = () => changeTodolistFilter('Active', todolistID)
    const setCompletedFilter = () => changeTodolistFilter('Completed', todolistID)


    return (
        <div>
            <div className='todolistTitle'>
                <TodolistTitle title={title}/>
                <Button  onClick={onClickRemoveTodoList}>
                    X
                </Button>
            </div>
                <AddItemForm addItem={onAddNewTask}/>

            <ul>
                {
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            removeTask={removeTaskHandler}
                            changeTaskStatus={onChangeTaskStatusHandler}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <Button onClick={setAllFilter} className={filter === 'All' ? 'activeButton' : ''}>All</Button>
                <Button onClick={setActiveFilter} className={filter === 'Active' ? 'activeButton' : ''}>Active</Button>
                <Button onClick={setCompletedFilter} className={filter === 'Completed' ? 'activeButton' : ''}>Completed</Button>
            </div>
        </div>
    );
};

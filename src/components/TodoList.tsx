import * as React from 'react';
import {TaskType} from "../App";
import {Task} from "./Task";
import {useState} from "react";

type Props = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID:number) => void
};
export const TodoList = ({title, tasks,removeTask}: Props) => {
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map(task => (
                        <Task
                            id={task.id}
                            removeTask={removeTask}
                            key={task.id}
                            title={task.title}
                            isDone={task.isDone}/>
                    ))
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

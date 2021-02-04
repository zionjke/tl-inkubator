import * as React from 'react';
import {TaskType} from "../App";

type Props = {
    title: string
    tasks: Array<TaskType>
};
export const TodoList = ({title, tasks}: Props) => {
    return (
        <div>
            <h2>{title}</h2>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    tasks.map((task,key) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>
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

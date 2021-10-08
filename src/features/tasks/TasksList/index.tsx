import * as React from 'react';
import { Task} from "../Task";
import {TaskDomainType} from "../tasks-reducer";

type Props = {
    filteredTasks: TaskDomainType[],
    todolistId: string,

};
export const TasksList = (props: Props) => {

    const {
        filteredTasks,
        todolistId
    } = props

    return (
        <ul style={{listStyle: 'none', paddingLeft: 0}}>
            {
                filteredTasks.map(task => (
                    <Task
                        key={task.id}
                        todolistId={todolistId}
                        task={task}/>
                ))
            }
        </ul>
    );
};
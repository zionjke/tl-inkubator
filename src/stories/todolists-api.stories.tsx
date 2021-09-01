import React, {useEffect, useState} from "react";
import {TodoListsApi} from "../api/todolists-api";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>([]);

    const getTodoLists = async () => {
        let {data} = await TodoListsApi.getTodoLists()
        setState(data)
    };

    useEffect(() => {
        getTodoLists()
    }, []);

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
};

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null);
    const title = 'newTodoList'

    const createTodoList = async () => {
        let {data} = await TodoListsApi.createTodoList(title)
        setState(data.data.item)
    };

    useEffect(() => {
        createTodoList()
    }, []);

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
};

export const DeleteTodoList = () => {
    const [state, setState] = useState<string>('');
    const todolistId = "fced9d6f-5fd9-45fd-973b-44c9571bb0be";

    const deleteTodoList = async () => {
        let {data} = await TodoListsApi.deleteTodoList(todolistId)
        console.log(data)
        if (data.resultCode === 0) {
            setState('Todolist Removed Successfully')
        }
    }


    useEffect(() => {
        deleteTodoList()
    }, []);

    return (
        <div>
            {state}
        </div>
    )
};

export const ChangeTodolistTitle = () => {
    const [state, setState] = useState<string>('');
    const todolistId = "fced9d6f-5fd9-45fd-973b-44c9571bb0be";
    const title = 'Todolist with new Title'

    const changeTodolistTitle = async () => {
        let {data} = await TodoListsApi.updateTodolistTitle(todolistId, title)
        if (data.resultCode === 0) {
            setState('Todolist Title Changed Successfully')
        }
    }

    useEffect(() => {
        changeTodolistTitle()
    }, [])

    return <>
        {state}
    </>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ffb9e93e-3a82-4014-a13e-bb005d0142f5'

    const getTasks = async () => {
        try {
            let {data} = await tasksApi.getTasks(todolistId)
            setState(data.items)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const todolistId = 'ffb9e93e-3a82-4014-a13e-bb005d0142f5'
    const newTaskTitle = 'newTask'

    const createTask = async () => {
        try {
            let {data} = await tasksApi.createTask(todolistId, newTaskTitle)
            setState(data.data.item)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        createTask()
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export const DeleteTask = () => {

    const [state, setState] = useState<string>('');
    const todolistId = "fced9d6f-5fd9-45fd-973b-44c9571bb0be";
    const taskId = "58389b45-4b1d-4e09-8b0b-4edcff9f31ea"

    const deleteTask = async () => {
        let {data} = await tasksApi.deleteTask(todolistId, taskId)
        console.log(data)
        if (data.resultCode === 0) {
            setState('TaskWithUseState Removed Successfully')
        }
    }


    useEffect(() => {
        deleteTask()
    }, []);

    return (
        <div>
            {state}
        </div>
    )
}

// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//
//     const todolistId = "ffb9e93e-3a82-4014-a13e-bb005d0142f5";
//     const taskId = "ff259e32-a4d2-463a-83aa-62fbb888e0a8"
//     const title = 'Updated TaskWithUseState Title'
//     const status = 1
//
//     const updateTask = async () => {
//         try {
//             let {data} = await tasksApi.updateTask(todolistId, taskId, title,status)
//             setState(data.data.item)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     useEffect(() => {
//         updateTask()
//     }, [])
//
//     return (
//         <div>
//             {JSON.stringify(state)}
//         </div>
//     )
// }

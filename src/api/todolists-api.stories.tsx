import {useEffect, useState} from "react";
import axios from 'axios'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
};

const APIInstance = axios.create(settings);

export const GetTodoLists = () => {
    const [state, setState] = useState(null);

    const getTodoLists = async () => {
        let {data} = await APIInstance.get('');
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

    const createTodoList = async () => {
        let response = await APIInstance.post('', {title: 'Test todoList in storybook'});
        setState(response.data.data.item)
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

    const todolistId = "dd6f055b-7ca8-4a7c-8ad9-c3835d1f4cff";

    const deleteTodoList = async () => {
        await APIInstance.delete(`${todolistId}`)
    }

    useEffect(() => {
        deleteTodoList()
    }, []);

    return (
        <div>

        </div>
    )
};

export const ChangeTodolistTitle = () => {
    const todolistId = "07f43da4-1d0e-4961-a093-6386611f8f8e";
    const changeTodolistTitle = async () => {
        await APIInstance.put(`${todolistId}`, {title: 'Todolist with new Title'})
    }
    useEffect(() => {
        changeTodolistTitle()
    })

    return <></>
}
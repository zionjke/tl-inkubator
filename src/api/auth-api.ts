import {APIInstance} from "./todolists-api";
import {ResponseType} from "./todolists-api";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type UserDataType = {
    id: number
    email: string
    login: string
}

export const authApi = {
    login(data: LoginParamsType) {
        return APIInstance.post<ResponseType<{ userId: number }>>('/auth/login', data)
    },
    authMe() {
        return APIInstance.get<ResponseType<UserDataType>>('/auth/me')
    },
    logout() {
        return APIInstance.delete<ResponseType>('/auth/login')
    }
}
import * as todolistAsyncsActions from './todolists-actions'
import {todolistsSlice} from './todolists-reducer'

const todolistsActions = {
    ...todolistAsyncsActions,
    ...todolistsSlice.actions
}

export {
    todolistsActions
}
import {actionTypes} from "../constants";

export const addTodoBlock = () => {
    return {
        type: actionTypes.ADD_TODO_BLOCK
    }
}

export const removeTodoBlock = id => {
    return {
        type: actionTypes.REMOVE_TODO_BLOCK,
        id,
    }
}

export const setCurrentTodoBlock = id => ({
    type: actionTypes.SET_CURRENT_TODO_BLOCK,
    id,
})
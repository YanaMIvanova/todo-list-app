import {actionTypes} from "../constants";

let nextTodoId = 1
export const addTodo = (text, blockId) => {
    return {
        id: `${blockId}-${nextTodoId++}`,
        type: actionTypes.ADD_TODO,
        blockId,
        text
    }
}

export const removeTodo = id => {
    return {
        type: actionTypes.REMOVE_TODO,
        id,
    }
}

export const toggleTodo = id => {
    return {
        type: actionTypes.TOGGLE_TODO,
        id
    }
}

export const setVisibilityFilter = (filter, blockId) => {
    return {
        type: actionTypes.SET_VISIBILITY_FILTER,
        filter,
        blockId
    }
}
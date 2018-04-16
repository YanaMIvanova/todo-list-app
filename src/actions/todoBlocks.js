import {actionTypes} from "../constants";

export const addTodoBlock = () => ({
    type: actionTypes.ADD_TODO_BLOCK
})

export const removeTodoBlock = id => ({
    type: actionTypes.REMOVE_TODO_BLOCK,
    id,
})

export const setTodoBlockTitle = (id, title) => ({
    type: actionTypes.SET_TODO_BLOCK_TITLE,
    id,
    title
})

export const setCurrentTodoBlock = id => ({
    type: actionTypes.SET_CURRENT_TODO_BLOCK,
    id,
})
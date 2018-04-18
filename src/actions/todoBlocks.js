import { actionTypes } from "../constants";

export const addTodoBlock = (todoBlock) => ({
    type: actionTypes.ADD_TODO_BLOCK,
    todoBlock
})

export const saveTodoBlockToStorage = () => ({
    type: actionTypes.SAVE_TODO_BLOCK_TO_STORAGE
})

export const deleteTodoBlock = id => ({
    type: actionTypes.DELETE_TODO_BLOCK,
    id,
})

export const deleteTodoBlockFromStorage = id => ({
    type: actionTypes.DELETE_TODO_BLOCK_FROM_STORAGE,
    id,
})

export const setTodoBlockTitle = (title, id) => ({
    type: actionTypes.SET_TODO_BLOCK_TITLE,
    id,
    title
})

export const setTodoBlockTitleToStorage = (title, id) => ({
    type: actionTypes.SET_TODO_BLOCK_TITLE_TO_STORAGE,
    id,
    title
})

export const setCurrentTodoBlock = id => ({
    type: actionTypes.SET_CURRENT_TODO_BLOCK,
    id,
})
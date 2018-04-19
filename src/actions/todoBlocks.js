import { actionTypes } from "../constants";

export const addTodoBlock = (todoBlock) => ({
    type: actionTypes.ADD_TODO_BLOCK,
    todoBlock
})

export const saveTodoBlockToStorage = () => ({
    type: actionTypes.SAVE_TODO_BLOCK_TO_STORAGE
})

export const deleteTodoBlock = blockId => ({
    type: actionTypes.DELETE_TODO_BLOCK,
    blockId,
})

export const setTodoBlockTitle = (title, blockId) => ({
    type: actionTypes.SET_TODO_BLOCK_TITLE,
    blockId,
    title
})

export const setCurrentTodoBlock = blockId => ({
    type: actionTypes.SET_CURRENT_TODO_BLOCK,
    blockId,
})
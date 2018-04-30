import { actionTypes } from "../constants";

export const addTodoBlock = (todoBlock) => ({
    type: actionTypes.ADD_TODO_BLOCK,
    todoBlock
})

export const closeTodoBlock = blockId => ({
    type: actionTypes.CLOSE_TODO_BLOCK,
    blockId
})

export const openTodoBlock = block => ({
    type: actionTypes.OPEN_TODO_BLOCK,
    block
})

export const removeTodoBlock = blockId => ({
    type: actionTypes.REMOVE_TODO_BLOCK,
    blockId
})

export const setClosedTodoBlocks = blocks => ({
    type: actionTypes.SET_CLOSED_TODO_BLOCKS,
    blocks
})

export const fetchClosedTodoBlocks = () => ({
    type: actionTypes.FETCH_CLOSED_TODO_BLOCKS
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
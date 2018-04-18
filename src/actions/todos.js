import { actionTypes } from "../constants";

export const addTodo = ({ text, blockId, id }) => ({
    id,
    type: actionTypes.ADD_TODO,
    blockId,
    text
})

export const addTodoToStorage = (text, blockId) => ({
    id: "",
    type: actionTypes.ADD_TODO_TO_STORAGE,
    blockId,
    text
})

export const deleteTodo = id => ({
    type: actionTypes.DELETE_TODO,
    id,
})

export const toggleTodo = id => ({
    type: actionTypes.TOGGLE_TODO,
    id
})

export const setVisibilityFilter = (filter, blockId) => ({
    type: actionTypes.SET_VISIBILITY_FILTER,
    filter,
    blockId
})
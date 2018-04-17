import { actionTypes } from "../constants";

let nextTodoId = 1
export const addTodo = (text, blockId) => ({
    id: `${blockId}-${nextTodoId++}`,
    type: actionTypes.ADD_TODO,
    blockId,
    text
})

export const removeTodo = id => ({
    type: actionTypes.REMOVE_TODO,
    id,
})

export const toggleTodo = id => ({
    type: actionTypes.TOGGLE_TODO,
    id
})

export const fetchUrgentTodos = () => ({
    type: actionTypes.FETCH_URGENT_TODOS,
})

export const setVisibilityFilter = (filter, blockId) => ({
    type: actionTypes.SET_VISIBILITY_FILTER,
    filter,
    blockId
})
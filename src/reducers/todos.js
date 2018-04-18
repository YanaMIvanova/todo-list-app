import { actionTypes } from "../constants";
import { currentTodoBlockIdSelector } from "./index";

const todos = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    blockId: action.blockId,
                    text: action.text,
                    completed: false
                }
            ]
        case actionTypes.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.id)
        case actionTypes.DELETE_TODO_BLOCK:
            return state.filter(todo => todo.blockId !== action.id)
        case actionTypes.TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo)
        default :
            return state
    }
}

export default todos

export const todosByBlockIdSelector = (state, id) => state.filter(todo => todo.blockId === id)

export const visibleTodosSelector = (state, filter) => {
    const todosByBlockId = todosByBlockIdSelector(state.todos, currentTodoBlockIdSelector(state))

    switch (filter) {
        case 'SHOW_ALL':
            return todosByBlockId
        case 'SHOW_COMPLETED':
            return todosByBlockId.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todosByBlockId.filter(t => !t.completed)
    }
}
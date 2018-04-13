import { combineReducers } from 'redux'
import { visibilityFilters, actionTypes } from '../constants/index'
const { SHOW_ALL } = visibilityFilters

const initialTodoBlock = (id) => {
    return {
        id,
        visibilityFilter: SHOW_ALL
    }
}

const todoBlocks = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO_BLOCK:
            return [
                ...state,
                initialTodoBlock(action.id)
            ]
        case actionTypes.SET_VISIBILITY_FILTER:
            return state.map(block => block.id === action.blockId ? {...block, visibilityFilter: action.filter} : block)
        default:
            return state
    }
}

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
        case actionTypes.TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo)
        default :
            return state
    }
}

const todoApp = combineReducers({
    todos,
    todoBlocks
})

export default todoApp

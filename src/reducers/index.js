import { combineReducers } from 'redux'
import { visibilityFilters, actionTypes } from '../constants/index'
import undoable, { includeAction } from 'redux-undo'
const { SHOW_ALL } = visibilityFilters

export const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case actionTypes.SET_VISIBILITY_FILTER:
            return action.filter
        default :
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
    visibilityFilter,
    todos: undoable(todos, {
        filter: includeAction([
            actionTypes.ADD_TODO,
            actionTypes.TOGGLE_TODO,
            actionTypes.REMOVE_TODO,
        ])
    })
})

export default todoApp

import {actionTypes} from "../constants";

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
        case actionTypes.REMOVE_TODO_BLOCK:
            return state.filter(todo => todo.blockId !== action.id)
        case actionTypes.TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo)
        default :
            return state
    }
}

export default todos
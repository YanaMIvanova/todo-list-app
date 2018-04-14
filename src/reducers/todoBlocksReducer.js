import {actionTypes, visibilityFilters} from "../constants";
const { SHOW_ALL } = visibilityFilters

const initialTodoBlock = (id) => {
    return {
        id,
        visibilityFilter: SHOW_ALL,
        title: "New List",
        selected: false
    }
}

const todosBlocks = (state = [{...initialTodoBlock(0)}], action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO_BLOCK:
            return [
                ...state,
                initialTodoBlock(action.id)
            ]
        case actionTypes.REMOVE_TODO_BLOCK:
            return state.filter(block => block.id !== action.id)
        case actionTypes.SET_VISIBILITY_FILTER:
            return state.map(block => block.id === action.blockId ? {...block, visibilityFilter: action.filter} : block)
        case actionTypes.SELECT_TODO_BLOCK:
            return state.map(block => block.id === action.id ? {...block, selected: true} : {...block, selected: false})
        default:
            return state
    }
}

export default todosBlocks
import { actionTypes } from "../constants";

const todoBlockItem = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.filter
            }
        case actionTypes.SET_TODO_BLOCK_TITLE:
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export default todoBlockItem
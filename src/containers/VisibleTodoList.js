import { connect } from 'react-redux'
import { toggleTodo, removeTodo } from '../actions'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../selectors'
import {blocksSelector} from "../reducers";

const mapStateToProps = (state, ownProps) => {
    const todoBlock = blocksSelector(state).find(block => block.id === ownProps.blockId)

    return {
        todos: getVisibleTodos(state.todos, todoBlock.visibilityFilter, ownProps.blockId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id)),
        removeTodo: id => dispatch(removeTodo(id))
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList
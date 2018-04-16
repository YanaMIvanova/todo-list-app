import { connect } from 'react-redux'
import { toggleTodo, removeTodo } from '../actions/todos'
import TodoList from '../components/TodoList'
import { visibleTodosSelector } from '../reducers/todos'
import { blocksSelector } from "../reducers";

const mapStateToProps = (state, ownProps) => {
    const todoBlock = blocksSelector(state).find(block => block.id === ownProps.blockId)

    return {
        todos: visibleTodosSelector(state, todoBlock.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id)),
        removeTodo: id => dispatch(removeTodo(id))
    }
}

const VisibleTodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoListContainer
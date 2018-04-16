import { connect } from 'react-redux'
import { toggleTodo, removeTodo } from '../actions/todos'
import TodoList from '../components/TodoList'
import { visibleTodosSelector } from '../reducers/todos'
import { currentTodoBlockSelector } from "../reducers";

const mapStateToProps = state => {
    const todoBlock = currentTodoBlockSelector(state)

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
import { connect } from 'react-redux'
import { toggleTodo, deleteTodoFromStorage } from '../actions/todos'
import { visibleTodosSelector } from '../reducers/todos'
import { currentTodoBlockSelector } from "../reducers";
import TodoList from '../components/TodoList'

const mapStateToProps = state => {
    const todoBlock = currentTodoBlockSelector(state)

    return {
        todos: visibleTodosSelector(state, todoBlock.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: id => dispatch(toggleTodo(id)),
        deleteTodo: id => dispatch(deleteTodoFromStorage(id))
    }
}

const VisibleTodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoListContainer
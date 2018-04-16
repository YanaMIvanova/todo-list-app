import React from 'react'
import PropTypes from 'prop-types'

const TodoItem = ({toggleTodo, removeTodo, completed, text, id}) => {
    return <div>
        <li
            style={ {
                textDecoration: completed ? 'line-through' : 'none'
            } }
        >
            {text}
        </li>
        <div>
            <button onClick={() => toggleTodo(id)}>{!completed ? "Mark as completed" : "Mark as active"}</button>
            &nbsp;
            <button onClick={() => removeTodo(id)}>Delete</button>
        </div>
    </div>
}

TodoItem.propTypes = {
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default TodoItem
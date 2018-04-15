import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'
import PropTypes from "prop-types";

let AddTodo = ({ dispatch, blockId }) => {
    let input = ''

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (input.value.trim()) {
                        dispatch(addTodo(input.value, blockId))
                        input.value = ''
                    }
                }}
            >
                <input ref={node => input = node} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

AddTodo.propTypes = {
    blockId: PropTypes.string.isRequired
}

export default connect()(AddTodo)
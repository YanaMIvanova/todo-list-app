import React from 'react'
import { connect } from "react-redux";
import { addTodoBlockToLocalStorage } from '../actions/todoBlocks'

const AddTodoBlockButton = ({ dispatch }) => (
    <button
        onClick={() => dispatch(addTodoBlockToLocalStorage())}
        className="add-todoblock-button"
    >
        Add Todo Block
    </button>
)

export default connect()(AddTodoBlockButton)
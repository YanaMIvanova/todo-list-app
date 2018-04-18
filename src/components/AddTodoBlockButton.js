import React from 'react'
import { connect } from "react-redux";
import { saveTodoBlockToStorage } from '../actions/todoBlocks'

const AddTodoBlockButton = ({ dispatch }) => (
    <button
        onClick={() => dispatch(saveTodoBlockToStorage())}
        className="add-todoblock-button"
    >
        Add Todo Block
    </button>
)

export default connect()(AddTodoBlockButton)
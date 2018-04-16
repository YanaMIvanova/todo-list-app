import React from 'react'
import { connect } from "react-redux";
import { addTodoBlock } from '../actions/todoBlocks'

const AddTodoBlockButton = ({ dispatch }) => (
    <button onClick={() => dispatch(addTodoBlock())}>
        Add Todo Block
    </button>
)

export default connect()(AddTodoBlockButton)
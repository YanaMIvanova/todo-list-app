import React from 'react'
import { addTodoBlock } from '../actions'
import { connect } from "react-redux";

const AddTodoBlock = ({ dispatch }) => (
    <button onClick={() => dispatch(addTodoBlock())}>
        Add Todo Block
    </button>
)

export default connect()(AddTodoBlock)
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/todos'
import AddTodoItemForm from "../components/AddTodoItemForm";

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    addTodo: todo => dispatch(addTodo(todo, ownProps.blockId))
})

const AddTodoItemFormContainer = connect(
    null,
    mapDispatchToProps
)(AddTodoItemForm)

export default AddTodoItemFormContainer
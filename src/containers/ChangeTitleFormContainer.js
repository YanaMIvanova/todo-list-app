import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTodoBlockTitle } from "../actions/todoBlocks";

const ChangeTitleFormContainer = ({ blockId, toggleChangeTitleForm, dispatch }) => {
    let input = ''

    return (
        <form
            className="todoblock-change-title-form"
            onSubmit={e => {
                e.preventDefault()
                if (input.value.trim()) {
                    dispatch(setTodoBlockTitle(blockId, input.value))
                    toggleChangeTitleForm()
                }
                input.value = ''
            }}
        >
            <input
                type="text"
                ref={node => input = node}
            />
            <button type="submit">
                Change Title
            </button>
        </form>
    )
}

ChangeTitleFormContainer.propTypes = {
    blockId: PropTypes.string.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default connect()(ChangeTitleFormContainer)
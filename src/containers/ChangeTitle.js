import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTodoBlockTitle } from "../actions/todoBlocks";

const ChangeTitle = ({ blockId, toggleChangeTitleForm, dispatch }) => {
    let input = ''

    return (
        <form
            style={{
                marginBottom: "10px"
            }}
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

ChangeTitle.propTypes = {
    blockId: PropTypes.string.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default connect()(ChangeTitle)
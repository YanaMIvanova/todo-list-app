import React from 'react'
import PropTypes from 'prop-types'
import { openTodoBlock } from "../actions/todoBlocks";
import { connect } from "react-redux";

const Dashboard = ({ closedTodoBlocks, dispatch }) => (
    <h1
        className="dashboard"
    >
        <div className="hamburger-icon">
            ☰
        </div>
        {
            closedTodoBlocks && closedTodoBlocks.map(block =>
                <div
                    key={block.id}
                    className="closed-todo-block"
                    onClick={() => dispatch(openTodoBlock(block))}
                >
                    {block.title}
                </div>
            )
        }
    </h1>
)

Dashboard.propTypes = {
    closedTodoBlocks: PropTypes.array
}

export default connect()(Dashboard)
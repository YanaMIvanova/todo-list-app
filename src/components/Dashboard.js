import React from 'react'
import PropTypes from 'prop-types'

const Dashboard = ({ closedTodoBlocks }) => (
    <h1
        className="dashboard"
    >
        <div className="hamburger-icon">
            ☰
        </div>
        {
            closedTodoBlocks && closedTodoBlocks.map(block => <h3 className="closed-todo-block">{block.title}</h3>)
        }
    </h1>
)

Dashboard.PropTypes = {
    closedTodoBlocks: PropTypes.array.isRequired
}

export default Dashboard
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
            closedTodoBlocks.length > 0
                ? closedTodoBlocks.map(block =>
                    <div
                        key={block.id}
                        className={classnames('closed-todo-block', {'opened': !block.isClosed})}
                        onClick={() => block.isClosed ? dispatch(openTodoBlock(block)) : null}
                    >
                        {block.title}
                    </div>
                )
                : <div>
                    <h3 className="no-closed-todo-block">
                        No closed lists
                    </h3>
                </div>
        }
    </h1>
)

Dashboard.propTypes = {
    closedTodoBlocks: PropTypes.array
}

export default connect()(Dashboard)
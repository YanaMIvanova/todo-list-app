import React from 'react'
import PropTypes from 'prop-types'
import AddTodoBlockButton from '../components/AddTodoBlockButton'
import TodoBlock from '../components/TodoBlock'
import Dashboard from "../components/Dashboard"

const TodoBlocks = ({
        shouldShowChangeTitleForm,
        closedTodoBlocks,
        currentBlockId,
        selectBlock,
        deleteBlock,
        closeTodoBlock,
        checkIsExpanded,
        toggleChangeTitleForm,
        blocks,
    }) => {

    return (
        <div
            className="todoblocks"
        >
            <Dashboard closedTodoBlocks={closedTodoBlocks} />
            {
                blocks.map(block =>
                    <TodoBlock
                        key={block.id}
                        block={block}
                        currentBlockId={currentBlockId}
                        checkIsExpanded={checkIsExpanded}
                        shouldShowChangeTitleForm={shouldShowChangeTitleForm}
                        selectBlock={selectBlock}
                        deleteBlock={deleteBlock}
                        closeTodoBlock={closeTodoBlock}
                        toggleChangeTitleForm={toggleChangeTitleForm}
                    />
                )
            }
            <AddTodoBlockButton />
        </div>
    )
}

TodoBlocks.propTypes = {
    shouldShowChangeTitleForm: PropTypes.bool.isRequired,
    closedTodoBlocks: PropTypes.array,
    blocks: PropTypes.array.isRequired,
    currentBlockId: PropTypes.string,
    checkIsExpanded: PropTypes.func.isRequired,
    selectBlock: PropTypes.func.isRequired,
    deleteBlock: PropTypes.func.isRequired,
    closeTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired,
}

export default TodoBlocks
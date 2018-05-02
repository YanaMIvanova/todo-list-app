import React, { Fragment } from 'react'
import PropTypes from "prop-types"
import Filters from './Filters'
import TodoBlockHeader from './TodoBlockHeader'
import DeleteTodoBlockButton from "./DeleteTodoBlockButton"
import AddTodoItemFormContainer from '../containers/AddTodoItemFormContainer'
import VisibleTodoListContainer from '../containers/VisibleTodoListContainer'
import ChangeTitleFormContainer from '../containers/ChangeTitleFormContainer'

const TodoBlock = ({
        currentBlockId,
        block,
        selectBlock,
        deleteBlock,
        closeTodoBlock,
        shouldShowChangeTitleForm,
        checkIsExpanded,
        toggleChangeTitleForm
    }) => (
        <div
            key={"key-" + block.id}
            className="todoblock"
        >
            <TodoBlockHeader
                checkIsExpanded={checkIsExpanded(block.id)}
                title={block.title}
                selectTodoBlock={selectBlock(block.id)}
                closeTodoBlock={closeTodoBlock(block.id)}
                toggleChangeTitleForm={toggleChangeTitleForm}
            />
            {
                checkIsExpanded(block.id) && (
                    <Fragment>
                        <DeleteTodoBlockButton deleteBlock={deleteBlock(block.id)}/>
                        {shouldShowChangeTitleForm
                            ? (
                                <ChangeTitleFormContainer
                                    BlockTitle={block.title}
                                    blockId={block.id}
                                    toggleChangeTitleForm={toggleChangeTitleForm}
                                />
                            )
                            : null
                        }
                        <AddTodoItemFormContainer blockId={block.id}/>
                        <Filters blockId={block.id}/>
                        <VisibleTodoListContainer />
                    </Fragment>
                )
            }
        </div>
)

TodoBlock.propTypes = {
    shouldShowChangeTitleForm: PropTypes.bool.isRequired,
    currentBlockId: PropTypes.string.isRequired,
    checkIsExpanded: PropTypes.func.isRequired,
    selectBlock: PropTypes.func.isRequired,
    deleteBlock: PropTypes.func.isRequired,
    closeTodoBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired,
    block: PropTypes.object.isRequired
}


export default TodoBlock
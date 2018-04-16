import React, { Fragment } from 'react'
import PropTypes from "prop-types";
import AddTodoItemFormContainer from '../containers/AddTodoItemFormContainer'
import VisibleTodoListContainer from '../containers/VisibleTodoListContainer'
import ChangeTitleFormContainer from '../containers/ChangeTitleFormContainer'
import Filters from './Filters'
import TodoBlockHeader from './TodoBlockHeader'

const TodoBlock = ({
        currentBlockId,
        block,
        selectBlock,
        removeBlock,
        showChangeTitleForm,
        toggleChangeTitleForm
    }) => (
        <div
            key={"key-" + block.id}
            className="todoblock"
        >
            <TodoBlockHeader
                title={block.title}
                removeTodoBlock={removeBlock(block.id)}
                selectTodoBlock={selectBlock(block.id)}
                toggleChangeTitleForm={toggleChangeTitleForm}
            />
            {
                currentBlockId === block.id && (
                    <Fragment>
                        {showChangeTitleForm
                            ? (
                                <ChangeTitleFormContainer
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
    showChangeTitleForm: PropTypes.bool.isRequired,
    currentBlockId: PropTypes.string.isRequired,
    block: PropTypes.object.isRequired,
    selectBlock: PropTypes.func.isRequired,
    removeBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}


export default TodoBlock
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
        deleteBlock,
        showChangeTitleForm,
        isExpanded,
        toggleChangeTitleForm
    }) => (
        <div
            key={"key-" + block.id}
            className="todoblock"
        >
            <TodoBlockHeader
                isExpanded={isExpanded(block.id)}
                title={block.title}
                deleteTodoBlock={deleteBlock(block.id)}
                selectTodoBlock={selectBlock(block.id)}
                toggleChangeTitleForm={toggleChangeTitleForm}
            />
            {
                isExpanded(block.id) && (
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
    isExpanded: PropTypes.func.isRequired,
    currentBlockId: PropTypes.number.isRequired,
    block: PropTypes.object.isRequired,
    selectBlock: PropTypes.func.isRequired,
    deleteBlock: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}


export default TodoBlock
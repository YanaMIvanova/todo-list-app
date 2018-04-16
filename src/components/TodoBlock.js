import React, { Fragment } from 'react'
import AddTodoContainer from '../containers/AddTodoContainer'
import VisibleTodoListContainer from '../containers/VisibleTodoListContainer'
import Filters from '../components/Filters'
import ChangeTitleFormContainer from '../containers/ChangeTitleFormContainer'
import TodoBlockHeader from './TodoBlockHeader'
import PropTypes from "prop-types";

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
            style={{
                border: "1px solid black",
                padding: "10px",
                minWidth: "400px",
                margin: "10px",
                display: "flex",
                flexDirection: "column"
            }}
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
                        <AddTodoContainer blockId={block.id}/>
                        <Filters blockId={block.id}/>
                        <VisibleTodoListContainer blockId={block.id}/>
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
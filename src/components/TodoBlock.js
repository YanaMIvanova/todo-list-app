import React from 'react'
import { connect } from 'react-redux'
import Filters from '../components/Filters'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import AddTodoBlock from './AddTodoBlock'

const TodoBlock = ({ blocks }) => (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
        {
            blocks.map(block => (
                <div key={"key-" + block.id} style={{ border: "1px solid black", padding: "10px", width: "30%", margin: "0 10px", display: "inline-block" }}>
                    <AddTodo blockId={block.id}/>
                    <Filters blockId={block.id}/>
                    <VisibleTodoList blockId={block.id}/>
                </div>
            ))
        }
        <AddTodoBlock />
    </div>
)

const mapStateToProps = state => {
    return {
        blocks: state.todoBlocks
    }
}

export default connect(
    mapStateToProps,
    null
)(TodoBlock)
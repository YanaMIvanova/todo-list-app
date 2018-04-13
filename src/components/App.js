import React from 'react'
import Filters from '../components/Filters'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import UndoRedo from '../containers/UndoRedo'

const App = () => {
    return <div>
        <AddTodo/>
        <UndoRedo/>
        <Filters/>
        <VisibleTodoList/>
    </div>
}

export default App
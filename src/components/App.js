import React from 'react'
import Filters from '../components/Filters'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => {
    return <div>
        <AddTodo/>
        <Filters/>
        <VisibleTodoList/>
    </div>
}

export default App
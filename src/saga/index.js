import { takeEvery, call, put, all } from 'redux-saga/effects'
import { actionTypes, visibilityFilters } from "../constants";
import { addTodoBlock, setTodoBlockTitle } from "../actions/todoBlocks";
import { addTodo } from "../actions/todos";
import { readFromStorage, writeToStorage } from "../localStorage";
const { SHOW_ALL } = visibilityFilters

export const defaultTodoBlock = {
    id: 0,
    visibilityFilter: SHOW_ALL,
    title: "New List"
}

// Workers

export function* initialSaga() {
    const mostRecentTodoBlockId = yield call(readFromStorage, "mostRecentTodoBlockId")
    const mostRecentTodoId = yield call(readFromStorage, "mostRecentTodoId")
    const todoBlocks = yield call(readFromStorage, "todoBlocks")
    const todos = yield call(readFromStorage, "todos")

    if (!mostRecentTodoBlockId) {
        yield call(writeToStorage,"mostRecentTodoBlockId", 0)
    }

    if (!mostRecentTodoId) {
        yield call(writeToStorage,"mostRecentTodoId", 0)
    }

    if (!todoBlocks) {
        yield call(writeToStorage,"todoBlocks", [])
    } else {
        for (let block of todoBlocks) {
            yield put(addTodoBlock(block))
        }
    }

    if (!todos) {
        yield call(writeToStorage,"todos", [])
    } else {
        for (let todo of todos) {
            yield put(addTodo(todo))
        }
    }
}

export function* saveTodoBlockToStorageWorker() {
    const mostRecentTodoBlockId = yield call(readFromStorage, "mostRecentTodoBlockId")

    const newTodoBlock = {
        ...defaultTodoBlock,
        id: mostRecentTodoBlockId + 1
    }

    yield put(addTodoBlock(newTodoBlock))

    yield call(writeToStorage, "mostRecentTodoBlockId", mostRecentTodoBlockId + 1)

    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    yield call(writeToStorage, "todoBlocks", [...todoBlocksFromStorage, newTodoBlock])
}

export function* deleteTodoBlockFromStorageWorker({ id }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")
    const todosFromStorage = yield call(readFromStorage, "todos")

    let filteredTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id !== id) {
            filteredTodoBlocks.push(block)
        }
    }

    let filteredTodos = []

    for (let todo of todosFromStorage) {
        if (todo.blockId !== id) {
            filteredTodos.push(todo)
        }
    }

    yield call(writeToStorage, "todoBlocks", filteredTodoBlocks)
    yield call(writeToStorage, "todos", filteredTodos)
}

export function* setTodoBlockTitleToStorageWorker({ title, id }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    let editedTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id === id) {
            block.title = title
        }
        editedTodoBlocks.push(block)
    }

    yield put(setTodoBlockTitle(title, id))

    yield call(writeToStorage, "todoBlocks", editedTodoBlocks)
}

export function* addTodoToStorageWorker(action) {
    const mostRecentTodoId = yield call(readFromStorage, "mostRecentTodoId")

    const newTodo = {
        ...action,
        id: `${action.blockId}-${mostRecentTodoId + 1}`
    }

    yield put(addTodo(newTodo))

    yield call(writeToStorage, "mostRecentTodoId", mostRecentTodoId + 1)

    const todosFromStorage = yield call(readFromStorage, "todos")

    yield call(writeToStorage, "todos", [...todosFromStorage, newTodo])
}

export function* deleteTodoWorker({ id }) {
    const todos = yield call(readFromStorage, "todos")

    let filteredTodos = []

    for (let todo of todos) {
        if (todo.id !== id) {
            filteredTodos.push(todo)
        }
    }

    yield call(writeToStorage, "todos", filteredTodos)
}

export function* toggleTodoWorker({ id }) {
    const todos = yield call(readFromStorage, "todos")

    let editedTodos = []

    for (let todo of todos) {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }
        editedTodos.push(todo)
    }

    yield call(writeToStorage, "todos", editedTodos)
}

// Watchers

export function* saveTodoBlockToStorageWatcher() {
    yield takeEvery(actionTypes.SAVE_TODO_BLOCK_TO_STORAGE, saveTodoBlockToStorageWorker)
}

export function* deleteTodoBlockFromStorageWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO_BLOCK, deleteTodoBlockFromStorageWorker)
}

export function* setTodoBlockTitleToStorageWatcher() {
    yield takeEvery(actionTypes.SET_TODO_BLOCK_TITLE_TO_STORAGE, setTodoBlockTitleToStorageWorker)
}

export function* saveTodoToStorageWatcher() {
    yield takeEvery(actionTypes.ADD_TODO_TO_STORAGE, addTodoToStorageWorker)
}

export function* deleteTodoWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO, deleteTodoWorker)
}

export function* toggleTodoWatcher() {
    yield takeEvery(actionTypes.TOGGLE_TODO, toggleTodoWorker)
}

export default function* rootSaga () {
    yield all([
        toggleTodoWatcher(),
        deleteTodoWatcher(),
        saveTodoToStorageWatcher(),
        setTodoBlockTitleToStorageWatcher(),
        deleteTodoBlockFromStorageWatcher(),
        saveTodoBlockToStorageWatcher(),
        initialSaga(),
    ])
}
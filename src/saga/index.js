import { takeEvery, call, put, all, select } from 'redux-saga/effects'
import { actionTypes, visibilityFilters } from "../constants";
import {addTodoBlock, setClosedTodoBlocks} from "../actions/todoBlocks";
import { addTodo } from "../actions/todos";
import { readFromStorage, writeToStorage } from "../localStorage";
import {todoBlockSelector} from "../reducers";
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
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIds = yield call(readFromStorage, "closedTodoBlocksIds")
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

    if (!closedTodoBlocks) {
        yield call(writeToStorage,"closedTodoBlocks", [])
    }

    if (!closedTodoBlocksIds) {
        yield call(writeToStorage,"closedTodoBlocksIds", [])
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

export function* deleteTodoBlockFromStorageWorker({ blockId }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")
    const todosFromStorage = yield call(readFromStorage, "todos")

    let filteredTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id !== blockId) {
            filteredTodoBlocks.push(block)
        }
    }

    let filteredTodos = []

    for (let todo of todosFromStorage) {
        if (todo.blockId !== blockId) {
            filteredTodos.push(todo)
        }
    }

    yield call(writeToStorage, "todoBlocks", filteredTodoBlocks)
    yield call(writeToStorage, "todos", filteredTodos)
}

export function* setTodoBlockTitleWorker({ title, blockId }) {
    const todoBlocksFromStorage = yield call(readFromStorage, "todoBlocks")

    let editedTodoBlocks = []

    for (let block of todoBlocksFromStorage) {
        if (block.id === blockId) {
            block.title = title
        }
        editedTodoBlocks.push(block)
    }

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

export function* closeTodoBlockWorker({ blockId }) {
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")
    const closedTodoBlocksIds = yield call(readFromStorage, "closedTodoBlocksIds")

    const todoBlockToClose = yield select(todoBlockSelector, blockId)

    if(!closedTodoBlocksIds.includes(blockId)) {
        yield call(writeToStorage, "closedTodoBlocks", [...closedTodoBlocks, todoBlockToClose])
        yield call(writeToStorage, "closedTodoBlocksIds", [...closedTodoBlocksIds, blockId])
    }
}

export function* fetchClosedTodoBlocksWorker() {
    const closedTodoBlocks = yield call(readFromStorage, "closedTodoBlocks")

    yield put(setClosedTodoBlocks(closedTodoBlocks))
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

export function* fetchTodoBlocksWatcher() {
    yield takeEvery(actionTypes.FETCH_CLOSED_TODO_BLOCKS, fetchClosedTodoBlocksWorker)
}

export function* saveTodoBlockToStorageWatcher() {
    yield takeEvery(actionTypes.SAVE_TODO_BLOCK_TO_STORAGE, saveTodoBlockToStorageWorker)
}

export function* deleteTodoBlockFromStorageWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO_BLOCK, deleteTodoBlockFromStorageWorker)
}

export function* setTodoBlockTitleWatcher() {
    yield takeEvery(actionTypes.SET_TODO_BLOCK_TITLE, setTodoBlockTitleWorker)
}

export function* saveTodoToStorageWatcher() {
    yield takeEvery(actionTypes.ADD_TODO_TO_STORAGE, addTodoToStorageWorker)
}

export function* deleteTodoWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO, deleteTodoWorker)
}

export function* closeTodoBlockWatcher() {
    yield takeEvery(actionTypes.CLOSE_TODO_BLOCK, closeTodoBlockWorker)
}

export function* toggleTodoWatcher() {
    yield takeEvery(actionTypes.TOGGLE_TODO, toggleTodoWorker)
}

export default function* rootSaga () {
    yield all([
        fetchTodoBlocksWatcher(),
        closeTodoBlockWatcher(),
        toggleTodoWatcher(),
        deleteTodoWatcher(),
        saveTodoToStorageWatcher(),
        setTodoBlockTitleWatcher(),
        deleteTodoBlockFromStorageWatcher(),
        saveTodoBlockToStorageWatcher(),
        initialSaga(),
    ])
}
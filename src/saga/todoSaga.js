import { actionChannel, takeLatest, takeEvery, call, put, all, take } from 'redux-saga/effects'
import { actionTypes } from "../constants";
import { addTodo } from "../actions/todos";
import { readFromStorage, writeToStorage } from "../localStorage";

// Workers

export function* addTodoWorker(action) {
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

export function* saveTodoWatcher() {
    const requestChan = yield actionChannel(actionTypes.ADD_TODO_TO_STORAGE)

    while (true) {
        const action = yield take(requestChan)

        yield call(addTodoWorker, action)
    }
}

export function* deleteTodoWatcher() {
    yield takeEvery(actionTypes.DELETE_TODO, deleteTodoWorker)
}

export function* toggleTodoWatcher() {
    yield takeLatest(actionTypes.TOGGLE_TODO, toggleTodoWorker)
}

export default function* todoSaga () {
    yield all([
        toggleTodoWatcher(),
        deleteTodoWatcher(),
        saveTodoWatcher()
    ])
}
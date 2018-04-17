import { takeEvery, all } from 'redux-saga/effects'
import {loadState, saveState} from "../localStorage";

export function* uploadInitialDataToLocalStore() {
    const urgentTodos = {
        "Work": [
            "Finish the Redux Project",
            "Catch up with the DS course",
            "Display the retrieved data"
        ],
        "Family": [
            "Buy birthday present"
        ]
    }

    saveState(urgentTodos)
}

export function* fetchUrgentTodosWorker() {
    const data = loadState()
    console.log(data)
}

export function* fetchUrgentTodosWatcher() {
    yield takeEvery('FETCH_URGENT_TODOS', fetchUrgentTodosWorker)
}

export default function* rootSaga () {
    yield all([
        uploadInitialDataToLocalStore(),
        fetchUrgentTodosWatcher()
    ])
}
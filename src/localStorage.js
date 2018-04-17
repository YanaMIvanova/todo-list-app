export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('data')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        console.log("error")
        return undefined
    }
}

export const saveState = (data) => {
    try {
        const serializedState = JSON.stringify(data)
        localStorage.setItem('data', serializedState)
    } catch (error) {
        return undefined
    }
}
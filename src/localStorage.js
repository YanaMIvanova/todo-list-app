export const readFromStorage = (item) => {
    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.getItem(`${item}`)), 500)
        )
        .then(retrievedData => JSON.parse(retrievedData))
    } catch (error) {
        console.log("error")
        return undefined
    }
}

export const writeToStorage = (item, data) => {

    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.setItem(`${item}`, JSON.stringify(data))), 500)
        )
    } catch (error) {
        console.log("error")
        return undefined
    }
}
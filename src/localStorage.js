export const readFromStorage = (item) => {
    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.getItem(`${item}`)), 200)
        )
        .then(retrievedData => JSON.parse(retrievedData))
    } catch (error) {
        console.log("error")
    }
}

export const writeToStorage = (item, data) => {

    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.setItem(`${item}`, JSON.stringify(data))), 200)
        )
    } catch (error) {
        console.log("error")
    }
}
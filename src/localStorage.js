export const loadState = (item) => {
    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.getItem(item)), 2000)
        )
        .then(retrievedData => JSON.parse(retrievedData))
    } catch (error) {
        console.log("error")
        return undefined
    }
}

export const saveState = (item, data) => {
    try {
        return new Promise(resolve =>
            setTimeout(() => resolve(localStorage.setItem(`${item}`, JSON.stringify(data))), 2000)
        )
    } catch (error) {
        console.log("error")
        return undefined
    }
}


const debounce = <T extends Array<any>>(fn: (...args: T) => any, timeout: number) => {
    let timer: number|null
    const debounced = function(...args: T){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => fn(...args), timeout)
    }
    debounced.clear = () => {
        if(timer){
            clearTimeout(timer)
        }
    }
    return debounced
}

export default debounce

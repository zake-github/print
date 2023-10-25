class EventEmitter {
    cache
    cacheValue
    constructor() {
        this.cache = {}
        this.cacheValue = {}
    }

    on(name, isCacheValue, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
        if (isCacheValue && this.cacheValue[name]) {
            this.emit(name, false, ...this.cacheValue[name])
        }
    }

    emit(name, isCacheValue, ...args) {
        console.log('args', args)
        const tasks = this.cache[name] && this.cache[name].slice() // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
        if (isCacheValue) {
            this.cacheValue[name] = args
        }
        if (tasks) {
            for (const fn of tasks) {
                fn(...args)
            }
        }
    }

    once(name, fn) {
        const onceFn = (...args) => {
            fn(...args)
            this.off(name, onceFn)
        }

        onceFn.callback = fn
        this.on(name, false, onceFn)
    }

    off(name, offFn) {
        if (!offFn) {
            delete this.cache[name] // 没有指明要关闭哪个监听回调，就清空所有
        } else {
            const stask = this.cache[name]
            if (stask) {
                const index = stask.findIndex(fn => fn === offFn || fn.callback === offFn)
                if (index >= 0) {
                    stask.splice(index, 1)
                }
            }
        }
    }
}

export const eventBus = new EventEmitter()
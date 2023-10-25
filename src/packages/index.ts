import PrintModel from './PrintModel/';
const coms = [PrintModel]
const install = (app) => {
    coms.forEach((c) => {
        app.component(c.name, c)
    })
}

export default {
    install,
    PrintModel
} 
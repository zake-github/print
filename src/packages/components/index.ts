import { defineAsyncComponent } from 'vue'
//  const modulesFiles = require.context('./', false, /\.vue$/)
//  export const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
//   }, {})
interface com {
    [k: string]: any;
}
const importContents = import.meta.glob('./content/*.vue');
const importAttrss = import.meta.glob('./attrs/*.vue');
const importViews = import.meta.glob('./views/*.vue');
const names = {}
const getComs = (imports) => {
    const components: com = {}
    for (const path in imports) {
        const result: Array<any> = path.match(/.*\/(.+).vue$/)!
        const modulesConent: any = imports[path]
        components[result[1]] = defineAsyncComponent(modulesConent)
        names[result[1]] = defineAsyncComponent(modulesConent)
    }
    return components
}

export const contentComponents = getComs(importContents);
export const attrsComponents = getComs(importAttrss);
export const viewsComponents = getComs(importViews);
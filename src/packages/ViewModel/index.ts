import ViewModel from './src/ViewModel.vue'

ViewModel.install = (app) => {
    app.component('ViewModel', ViewModel)
}

export default ViewModel

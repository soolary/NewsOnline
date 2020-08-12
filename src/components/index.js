import Breadcrumb from './Breadcrumb.vue'

const myPlugin = {
  install (Vue) {
    Vue.component(Breadcrumb.name, Breadcrumb)
  }
}
export default myPlugin

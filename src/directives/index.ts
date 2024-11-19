import { App } from 'vue'
import permission from './permission'

const install = (app: App) => {
  app.directive('permission', permission)
}
export default install

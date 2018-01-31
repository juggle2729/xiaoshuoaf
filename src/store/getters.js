const pkg = state => state.pkg
const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const menuitems = state => state.menu.items
const componententry = state => {
  return state.menu.items.filter(c => c.name === 'Components')[0]
}
const getModule = state => state.dataConfig.getModule
const getModuleDetailList = state => state.dataConfig.getModuleDetailList
export {
  pkg,
  app,
  device,
  sidebar,
  effect,
  menuitems,
  componententry,
    getModule,
    getModuleDetailList
}

import Mueditor from './Mueditor'

const components = [
  'Mueditor'
]

const install = function(Vue, opts = {}) {
  if (install.installed) return
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '1.0.1',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  Mueditor
}

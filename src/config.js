'use strict'

let toExport = {}

toExport.list = {
  production: {
    name: 'Talkey PROD',
    title: 'Talkey Web Chat',
    baseUrl: '',
  },
  developer: {
    name: 'Talkey DEV',
    title: 'Talkey',
    baseUrl: '',
  },
  default: {
    name: 'Talkey DEF',
    title: 'Talkey',
    baseUrl: '',
  },
}

toExport.config = toExport.list['default']

if (process.env.NODE_ENV === 'production') {
  toExport.config = toExport.list['production']
} else {
  toExport.config = toExport.list['developer']
  console.log('Server config start configName: ' + toExport.config.name)
}

toExport.appConfig = toExport.config
module.exports = toExport

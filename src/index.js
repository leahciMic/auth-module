const { resolve } = require('path')
const merge = require('lodash/merge')

export default async function module (moduleOptions) {
  // Apply defaults
  const defaults = {
    login: {
      endpoint: 'auth/login',
      propertyName: 'token',
      session: false
    },
    logout: {
      endpoint: 'auth/logout',
      method: 'GET',
      paramTokenName: '',
      appendToken: false
    },
    user: {
      endpoint: 'auth/user',
      propertyName: 'user',
      paramTokenName: '',
      appendToken: false
    },
    storageTokenName: 'nuxt-auth-token',
    tokenType: 'Bearer'
  }

  const options = merge(defaults, moduleOptions, this.options.auth)

  // Plugin
  this.addPlugin({ src: resolve(__dirname, '../templates/auth.plugin.js'), fileName: 'auth.plugin.js' })

  // Middleware
  this.addTemplate({ src: resolve(__dirname, '../templates/auth.middleware.js'), fileName: 'auth.middleware.js' })

  // Store
  this.addTemplate({ src: resolve(__dirname, '../templates/auth.store.js'), fileName: 'auth.store.js', options })
}

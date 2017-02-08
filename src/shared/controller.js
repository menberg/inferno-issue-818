import { Controller } from 'cerebral'
import Router from 'cerebral-router'
import app from './modules/app'
import { routes } from './routes'

let initialState = {}
let devtools = false

if (typeof window !== 'undefined') {
  initialState = window.APP_STATE
  if (process.env.NODE_ENV !== 'production') {
    devtools = require('cerebral/devtools').default()
  }
}

const controller = Controller({
  state: initialState,
  modules: {
    app: app
  },
  router: Router({
    routes: routes
  }),
  devtools: devtools
})

export default controller

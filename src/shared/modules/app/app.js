import { state } from 'cerebral/tags'
import { set } from 'cerebral/operators'

let initialState = {
  currentPage: 'start'
}

export default {
  state: initialState,
  signals: {
    homeRouted: [set(state`app.currentPage`, 'start')],
    notfoundRouted: [set(state`app.currentPage`, '404')]
  }
}

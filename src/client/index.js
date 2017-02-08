import Inferno from 'inferno'

import ReactHotLoader from './components/ReactHotLoader'
import { Container } from 'cerebral/inferno'
import controller from '../shared/controller'
import App from '../shared/components/App'

// remove the 300ms lag after clicking on links on some devices
import FastClick from './fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app')

function renderApp (TheApp) {
  Inferno.render(
    <ReactHotLoader>
      <Container controller={controller}>
        <TheApp />
      </Container>
    </ReactHotLoader>,
    container
  )
}

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js')
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/components/App',
    () => renderApp(require('../shared/components/App').default)
  )
}

// Execute the first render of our app.
renderApp(App)

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
// -> currently disabled
// require('./registerServiceWorker')

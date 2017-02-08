import Inferno from 'inferno' // eslint-disable-line

import { renderToString } from 'inferno-server'

import { Container } from 'cerebral/inferno'
import controller from '../../../shared/controller'
import { routes, routeNotFound } from '../../../shared/routes'

import generateHTML from './generateHTML'
import App from '../../../shared/components/App'
import envConfig from '../../../../config/private/environment'

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function reactApplicationMiddleware (request, response) {
  // We should have had a nonce provided to us.  See the server/index.js for
  // more information on what this is.
  if (typeof response.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response')
  }
  const nonce = response.locals.nonce

  // It's possible to disable SSR, which can be useful in development mode.
  // In this case traditional client side only rendering will occur.
  if (!envConfig.ssrEnabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log('==> Handling app without SSR')
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to initialize and render the react application.
    const html = generateHTML({
      // Nonce which allows us to safely declare inline scripts.
      nonce
    })
    response.status(200).send(html)
    return
  }

  if (routes.hasOwnProperty(request.url)) {
    controller.getSignal(routes[request.url])()
  } else {
    controller.getSignal(routeNotFound)()
  }

  // Create our React application and render it into a string.
  const reactAppString = renderToString(
    <Container controller={controller}>
      <App />
    </Container>
  )

  const initialState = controller.getState()

  // Generate the html response.
  const html = generateHTML({
    // Provide the full app react element.
    reactAppString,
    // pass the initial state to the html document
    initialState,
    // Nonce which allows us to safely declare inline scripts.
    nonce
  })

  response
    .status(200)
    .send(html)
}

export default (reactApplicationMiddleware)

// Define app wide available routes and it's associated actions
const routes = {
  '/': 'app.homeRouted'
}

const routeNotFound = 'app.notfoundRouted'

if (typeof window !== 'undefined') {
  routes['/*'] = routeNotFound
}

export { routes, routeNotFound }

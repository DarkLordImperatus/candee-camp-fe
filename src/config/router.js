import createRouter from 'router5'
import loggerPlugin from 'router5/plugins/logger'
import browserPlugin from 'router5/plugins/browser'

const routes: Array = [{name: 'home', path: '/'}]

const router = createRouter(routes, {})
  .usePlugin(loggerPlugin)
  .usePlugin(browserPlugin({useHash: true}))

export default router

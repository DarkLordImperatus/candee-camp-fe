import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {RouterProvider} from 'react-router5'
import {AppContainer} from 'react-hot-loader'

import App from './screens/App'
import store from './config/store'
import router from './config/router'

import './main.scss'

const render = Component => {
  router.setDependency('store', store)
  router.start(() => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <RouterProvider router={router}>
            <Component />
          </RouterProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('cgen-root'),
    )
  })
}

render(App)

if (module.hot) {
  module.hot.accept('./screens/App', () => render(App))
}

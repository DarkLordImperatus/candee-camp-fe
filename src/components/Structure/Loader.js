import React from 'react'
import {Spin} from 'antd'

export const LoaderContext = React.createContext({
  spinning: false,
  tip: 'Loading...',
})

const loader = (Component: React.ReactNode) => (props: {}) => (
  <LoaderContext.Consumer>
    {loaderContext => (
      <Spin {...loaderContext}>
        <Component loader={loaderContext} {...props} />
      </Spin>
    )}
  </LoaderContext.Consumer>
)

export default loader

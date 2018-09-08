import React from 'react'
import {Spin} from 'antd'

export const LoaderContext = React.createContext({
  spinning: false,
  tip: 'Loading...',
})

function loader(Component) {
  const LoaderWrapper = props => (
    <LoaderContext.Consumer>
      {loaderContext => (
        <Spin {...loaderContext}>
          <Component loader={loaderContext} {...props} />
        </Spin>
      )}
    </LoaderContext.Consumer>
  )

  return LoaderWrapper
}

export default loader

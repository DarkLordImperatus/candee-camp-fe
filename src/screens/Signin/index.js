import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as routeActions} from 'redux-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import SigninLayout from '../../components/Structure/SigninLayout'
import SigninContent from './components/SigninContent'

type Props = {
  loading: {
    signin: boolean,
  },

  // functions
  navigateTo: () => void,
  signin: (fields: {}) => void,
}

type State = {
  fields: {
    email: {isRequired: boolean, value?: string},
    password: {isRequired: boolean, value?: string},
  },
}

const INITIAL_STATE = {
  fields: {
    email: {isRequired: true, value: ''},
    password: {isRequired: true, value: ''},
  },
}

class Signin extends React.Component<Props, State> {
  state = INITIAL_STATE

  handleFieldChange = changedFields =>
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }))

  handleFormSubmit = () => {
    const {navigateTo, signin} = this.props
    const {fields} = this.state

    if (isFormReady(fields)) {
      signin(fields).then(() => {
        navigateTo('dashboard')
      })
    }
  }

  render() {
    const {loading} = this.props
    const {fields} = this.state
    const validForm = isFormReady(fields)

    return (
      <SigninLayout title="Candee Camp">
        <SigninContent
          fields={fields}
          loading={loading.signin}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleFormSubmit}
          validForm={validForm}
        />
      </SigninLayout>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.signin.loading,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: routeActions.navigateTo,
      signin: actions.signin,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin)

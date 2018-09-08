import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as routeActions, createRouteNodeSelector} from 'redux-router5'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import {LoaderContext} from '../../components/Structure/Loader'
import ResetPasswordContent from './components/ResetPasswordContent'

type Props = {
  loading: {
    resetPassword: boolean,
    resetPasswordValidate: boolean,
  },
  route: {
    params: {
      token?: string,
    },
  },
  validResetPasswordToken: boolean,

  // functions
  navigateTo: (route: string) => void,
  resetPassword: (fields: {}) => void,
  validateResetPasswordToken: (token: string) => void,
}

type State = {
  fields: {
    confirmPassword: {isRequired: boolean, value?: string},
    newPassword: {isRequired: boolean, value?: string},
  },
}

const INITIAL_STATE = {
  fields: {
    confirmPassword: {isRequired: true, value: ''},
    newPassword: {isRequired: true, value: ''},
  },
}

class ResetPassword extends React.Component<Props, State> {
  state = INITIAL_STATE

  componentDidMount() {
    const {route, navigateTo, validateResetPasswordToken} = this.props

    validateResetPasswordToken(route.params.token).catch(() => {
      navigateTo('signin')
    })
  }

  handleFieldChange = changedFields =>
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }))

  handleFormSubmit = () => {
    const {navigateTo, resetPassword} = this.props
    const {fields} = this.state

    if (isFormReady(fields)) {
      resetPassword(fields).then(() => {
        navigateTo('signin')
      })
    }
  }

  render() {
    const {loading} = this.props
    const {fields} = this.state
    const validForm = isFormReady(fields)

    return (
      <SigninLayout title="Candee Camp">
        <LoaderContext.Provider
          value={{
            spinning: loading.resetPasswordValidate,
            tip: 'Validating token...',
          }}
        >
          <ResetPasswordContent
            fields={fields}
            loading={loading.resetPassword}
            onFieldChange={this.handleFieldChange}
            onSubmit={this.handleFormSubmit}
            validForm={validForm}
          />
        </LoaderContext.Provider>
      </SigninLayout>
    )
  }
}

const mapStateToProps = state => ({
  ...createRouteNodeSelector('resetPassword')(state),
  loading: state.signin.loading,
  validToken: state.signin.validResetPasswordToken,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: routeActions.navigateTo,
      resetPassword: actions.resetPassword,
      validateResetPasswordToken: actions.validateResetPasswordToken,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)

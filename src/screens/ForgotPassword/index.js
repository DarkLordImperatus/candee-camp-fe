import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {isFormReady} from '../../helpers'
import {signinActions as actions} from '../../actions'

import {SigninLayout} from '../../components/Structure'
import ForgotPasswordContent from './components/ForgotPasswordContent'

type Props = {
  loading: {
    signin: boolean,
  },

  // functions
  signin: (fields: {}) => void,
}

type State = {
  fields: {
    email: {isRequired: boolean, value?: string},
  },
}

const INITIAL_STATE = {
  fields: {
    email: {isRequired: true, value: ''},
  },
}

class ForgotPassword extends React.Component<Props, State> {
  state = INITIAL_STATE

  handleFieldChange = changedFields =>
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }))

  handleFormSubmit = () => {
    const {forgotPassword} = this.props
    const {fields} = this.state

    if (isFormReady(fields)) {
      forgotPassword(fields).then(() => {
        this.setState(INITIAL_STATE)
      })
    }
  }

  render() {
    const {loading} = this.props
    const {fields} = this.state
    const validForm = isFormReady(fields)

    return (
      <SigninLayout title="Candee Camp">
        <ForgotPasswordContent
          fields={fields}
          loading={loading.forgotPassword}
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
      forgotPassword: actions.forgotPassword,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword)

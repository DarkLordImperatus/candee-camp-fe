import React from 'react'

import {isFormReady} from '../../helpers'

import SigninLayout from '../../components/Structure/SigninLayout'
import SigninContent from './components/SigninContent'

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

class Signin extends React.Component<null, State> {
  state = INITIAL_STATE

  handleFieldChange = changedFields =>
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }))

  render() {
    const {fields} = this.state
    const validForm = isFormReady(fields)

    return (
      <SigninLayout title="Sign in">
        <SigninContent
          fields={fields}
          onFieldChange={this.handleFieldChange}
          validForm={validForm}
        />
      </SigninLayout>
    )
  }
}

export default Signin

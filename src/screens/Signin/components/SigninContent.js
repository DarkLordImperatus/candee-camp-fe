import React from 'react'
import {Col, Row, Button} from 'antd'

import {NavItem} from '../../../components/Navigation'
import {Copyright} from '../../../components/Structure'
import SigninForm from './SigninForm'

import './signinContent.scss'

type Props = {
  fields: {},
  loading: boolean,
  validForm: boolean,

  // functions
  onFieldChange: () => void,
  onSubmit: () => void,
}

const SigninContent = (props: Props) => (
  <div>
    <h1 className="header">Sign in</h1>

    <h2 className="welcome-header">
      Welcome back! We are happy you like Candee Camp.
    </h2>

    <Row>
      <Col md={{span: 16, offset: 4}}>
        <SigninForm
          {...props.fields}
          onChange={props.onFieldChange}
          onSubmit={props.onSubmit}
        />

        <div className="forgot-password-link">
          <NavItem options={{reload: true}} routeName="forgotPassword">
            Forgot password?
          </NavItem>
        </div>

        <Button
          block
          data-testid="signinButton"
          disabled={!props.validForm}
          loading={props.loading}
          onClick={props.onSubmit}
          size="large"
          type="primary"
        >
          Sign in
        </Button>
      </Col>
    </Row>

    <Copyright />
  </div>
)

export default SigninContent

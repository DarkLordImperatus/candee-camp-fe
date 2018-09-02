import React from 'react'
import {Col, Row, Button} from 'antd'

import SigninForm from './SigninForm'

import './signinContent.scss'

type Props = {
  fields: {},
  loading: false,
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
          <a href="#">Forgot password?</a>
        </div>

        <Button
          block
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

    <div className="copy">
      <small>
        &copy; 2017 - {new Date().getFullYear()}{' '}
        <a href="https://candeegenerations.com" target="_blank">
          Candee Generations
        </a>
        , LLC. All Rights Reserved.
      </small>
    </div>
  </div>
)

export default SigninContent

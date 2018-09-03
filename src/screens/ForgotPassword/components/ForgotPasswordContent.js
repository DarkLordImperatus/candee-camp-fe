import React from 'react'
import {Col, Row, Button} from 'antd'

import {NavItem} from '../../../components/Navigation'
import {Copyright} from '../../../components/Structure'
import ForgotPasswordForm from './ForgotPasswordForm'

import './forgotPasswordContent.scss'

type Props = {
  fields: {},
  loading: boolean,
  validForm: boolean,

  // functions
  onFieldChange: () => void,
  onSubmit: () => void,
}

const ForgotPasswordContent = (props: Props) => (
  <div>
    <h1 className="header forgot-password">Forgot your password?</h1>

    <h3 className="welcome-header">
      Enter your email below, and we'll send you the reset link.
    </h3>

    <Row>
      <Col md={{span: 16, offset: 4}}>
        <ForgotPasswordForm
          {...props.fields}
          onChange={props.onFieldChange}
          onSubmit={props.onSubmit}
        />

        <Button
          block
          data-testid="sendResetLinkButton"
          disabled={!props.validForm}
          loading={props.loading}
          onClick={props.onSubmit}
          size="large"
          type="primary"
        >
          Send reset link
        </Button>

        <div className="back-to-signin-link">
          <NavItem options={{reload: true}} routeName="signin">
            Back to sign in
          </NavItem>
        </div>
      </Col>
    </Row>

    <Copyright />
  </div>
)

export default ForgotPasswordContent

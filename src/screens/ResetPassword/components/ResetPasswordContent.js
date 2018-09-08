import React from 'react'
import {Button, Col, Row} from 'antd'

import {Copyright} from '../../../components/Structure'
import loader from '../../../components/Structure/Loader'

import ResetPasswordForm from './ResetPasswordForm'

type Props = {
  fields: {},
  loading: boolean,
  validForm: boolean,

  // functions
  onFieldChange: () => void,
  onSubmit: () => void,
}

const ResetPasswordContent = (props: Props) => {
  return props.loader.spinning ? (
    <div style={{minHeight: 533}} />
  ) : (
    <div>
      <h1 className="header forgot-password">Reset your password?</h1>

      <h3 className="welcome-header">
        Enter a new password to reset your password.
      </h3>

      <Row>
        <Col md={{span: 16, offset: 4}}>
          <ResetPasswordForm
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
            Reset Password
          </Button>
        </Col>
      </Row>

      <Copyright />
    </div>
  )
}

export default loader(ResetPasswordContent)

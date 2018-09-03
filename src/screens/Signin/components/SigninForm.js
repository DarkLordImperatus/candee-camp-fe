import React from 'react'
import {Form, Input} from 'antd'

const SigninForm = Form.create({
  onFieldsChange(props, changedFields) {
    const {onChange} = props

    onChange(changedFields)
  },

  mapPropsToFields(props) {
    const {email, password} = props

    return {
      email: Form.createFormField({
        ...email,
        value: email.value,
      }),
      password: Form.createFormField({
        ...password,
        value: password.value,
      }),
    }
  },
})(props => {
  const {form, onSubmit} = props
  const {getFieldDecorator} = form

  return (
    <Form>
      <Form.Item hasFeedback>
        {getFieldDecorator('email', {
          rules: [
            {required: true, message: 'Your email is required.'},
            {type: 'email', message: 'Please use a valid email.'},
          ],
        })(<Input autoFocus placeholder="Email" size="large" />)}
      </Form.Item>

      <Form.Item hasFeedback style={{marginTop: 20}}>
        {getFieldDecorator('password', {
          rules: [
            {required: true, message: 'Your password is required.'},
            {min: 6, message: 'This password is too short.'},
          ],
        })(
          <Input
            placeholder="Password"
            size="large"
            type="password"
            onKeyUp={e => {
              if (e.keyCode === 13) {
                onSubmit()
              }
            }}
          />,
        )}
      </Form.Item>
    </Form>
  )
})

export default SigninForm

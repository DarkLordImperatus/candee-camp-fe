const schema = {
  type: 'object',
  properties: {
    signin: {
      type: 'object',
      properties: {
        result: {
          type: 'string',
          chance: 'guid',
        },
      },
      required: ['result'],
    },
    forgotPassword: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    validateResetPasswordToken: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    resetPassword: {
      type: 'object',
      properties: {
        result: true,
      },
      required: ['result'],
    },
    users: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            unique: true,
            minimum: 1,
          },
          email: 'tester@test.com',
          password: 'abc123',
        },
        required: ['id', 'type', 'email', 'password'],
      },
    },
  },
  required: [
    'users',
    'signin',
    'forgotPassword',
    'validateResetPasswordToken',
    'resetPassword',
  ],
}

module.exports = schema

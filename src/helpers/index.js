import {notificationActions as notifications} from '../actions'

const errorTrace = error => {
  console.error('Error :', error) // eslint-disable-line no-console

  return error
}

export const isFormReady: boolean = (fields: {}) => {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const property = fields[key]

      if (
        property.isRequired &&
        (!property.touched || (property.errors && property.errors.length > 0))
      ) {
        return false
      }
    }
  }

  return true
}

export const handleError: void = (
  message: string,
  error: {},
  dispatch: () => void = null,
) => {
  if (error) {
    errorTrace(error)
  }

  if (typeof dispatch === 'function') {
    dispatch(notifications.error(message))
  }
}

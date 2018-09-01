export const isFormReady = fields => {
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

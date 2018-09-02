/* This script generates mock data for local development.
  This way you don't have to point to an actual API,
  but you can enjoy realistic, but randomized data,
  and rapid page loads due to local, static data.
 */
/* eslint-disable */

const fs = require('fs')
const Chance = require('chance')
const jsf = require('json-schema-faker')
const mockDataSchema = require('./schema')

jsf.extend('chance', function() {
  return new Chance()
})

const json = JSON.stringify(jsf(mockDataSchema))

fs.writeFile('./src/api/mock/db.json', json, err => {
  if (err) {
    return console.log(err)
  } else {
    console.log('Mock data generated.')
  }
})

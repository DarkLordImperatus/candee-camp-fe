import React from 'react'
import * as testingUtils from 'testing-utils'

import Copyright from '../Copyright'

describe(testingUtils.formatDescribeName('Copyright'), () => {
  afterEach(testingUtils.cleanup)

  test(testingUtils.formatTestName('displays correctly'), () => {
    /* Constants */
    const date = new Date().getFullYear()

    /* Create component */
    const {getByText} = testingUtils.render(<Copyright />)

    /* Assertions */
    // displays correctly
    expect(getByText(content => content.includes('2017'))).toBeTruthy()
    expect(getByText(content => content.includes(date))).toBeTruthy()
    expect(
      getByText(content => content.includes('Candee Generations')),
    ).toBeTruthy()
    expect(
      getByText(content => content.includes(', LLC. All Rights Reserved.')),
    ).toBeTruthy()
  })
})

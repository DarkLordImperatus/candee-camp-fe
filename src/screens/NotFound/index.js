import React from 'react'
import {Row, Col, Button} from 'antd'

const NotFound = () => (
  <Row>
    <Col span={12} offset={6}>
      <div style={{marginTop: 40, textAlign: 'center'}}>
        <h1>Candee Camp</h1>

        <hr />

        <img src="https://camo.githubusercontent.com/8095de26f9acdad6a0a3152bfe058f013de8552c/68747470733a2f2f656d6f6a6970656469612d75732e73332e616d617a6f6e6177732e636f6d2f7468756d62732f3332302f6170706c652f3132392f63616d70696e675f31663364352e706e67" />

        <h2 style={{margin: '25px 0 50px'}}>Church Camp Software</h2>

        <Button
          href="https://github.com/CandeeGenerations/candee-camp-fe"
          target="_blank"
          size="large"
          type="primary"
        >
          Learn More
        </Button>

        <div style={{marginTop: 50}}>
          <small>
            &copy; 2017 - {new Date().getFullYear()}{' '}
            <a href="https://candeegenerations.com" target="_blank">
              Candee Generations
            </a>
            , LLC. All Rights Reserved.
          </small>
        </div>
      </div>
    </Col>
  </Row>
)

export default NotFound

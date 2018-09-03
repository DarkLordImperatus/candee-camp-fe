import React from 'react'

import './signinLayout.scss'

type Props = {
  children: React.ReactNode,
  title: string,
}

const SigninLayout = (props: Props) => {
  return (
    <div className="signin-layout">
      <div className="content">{props.children}</div>

      <div className="title-wrapper">
        <div className="title">{props.title}</div>
      </div>
    </div>
  )
}

export default SigninLayout

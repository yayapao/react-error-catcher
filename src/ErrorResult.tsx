import React from 'react'
import { Result } from 'antd'
import { ErrorInfo } from '@/components/ErrorCatcher/data.d'

interface ErrorResultProps {
  info?: ErrorInfo
}

export default (props: ErrorResultProps) => {
  const subTitle = 'Sorry, something went wrong!'
  const { info } = props
  return (
    <Result
      status="500"
      title="Error Catched"
      subTitle={subTitle}
      extra={<code>{JSON.stringify(info)}</code>}
    />
  )
}

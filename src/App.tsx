import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import Router from '@/router/routes'
import BasicLayout from '@/layout/BasicLayout'
import ErrorCatcher from '@/components/ErrorCatcher'
import ErrorResult from './ErrorResult'
import { ErrorInfo } from '@/components/ErrorCatcher/data.d'
import './App.less'

function App() {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>()
  return (
    <BasicLayout>
      <ErrorCatcher
        app="react-error-catcher"
        user="Y-lonelY"
        errorRender={<ErrorResult info={errorInfo} />}
        fetch={(error) => {
          setErrorInfo(error)
        }}
      >
        <Router />
      </ErrorCatcher>
    </BasicLayout>
  )
}

export default hot(App)

import React from 'react'
import { hot } from 'react-hot-loader/root'
import Router from '@/router/routes'
import BasicLayout from '@/layout/BasicLayout'
import './App.less'

function App() {
  return (
    <BasicLayout>
      <Router />
    </BasicLayout>
  )
}

export default hot(App)

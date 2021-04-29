import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
// import ErrorCatcher from 'react-error-catcher'
import ErrorCatcher from './develop'

ReactDOM.render(
  <React.StrictMode>
    <ErrorCatcher
      app="react-catcher"
      user="Y-lonelY"
      delay={5000}
      max={1}
      filters={[]}
      onCatch={(errors) => {
        console.log('catched')
      }}
    >
      <App />
    </ErrorCatcher>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

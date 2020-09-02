import React from 'react'
import { ErrorInfo, Error } from './data.d'
import pick from 'lodash/pick'

interface ErrorBoundaryProps {
  errorRender?: React.ReactNode
  user?: string
  app?: string | number
  fetch?: (error: ErrorInfo) => any
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }
/**
 * a static method，usually used to change this.state
 * called in the render time, so no effects!
 * By return a value to change the state, just like setState()
 */
  static getDerivedStateFromError() {
    // only conponent catchs error, then update state to display downgrade UI
    return {
      hasError: true,
    }
  }

  /**
   * catch React Component render Errors
   * called in commit time
   */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    try {
      const obj = {
        caughtEvent: 'componentDidCatch',
        message: error.message,
        timeOrigin: window.performance.timeOrigin,
        stack: info.componentStack,
        type: error.name,
        isTrusted: true,
        cookieEnabled: window.clientInformation.cookieEnabled,
        cookie: document.cookie || '',
        userAgent: window.clientInformation.userAgent,
        href: window.location.href,
        screenHeight: window.screen.availHeight,
        screenWidth: window.screen.availWidth,
      }
      this.postError(obj)
    } catch (error) {
      throw new Error('Caught By Error Boundaries Self')
    }
  }

  componentDidMount() {
    // event catch
    window.addEventListener(
      'error',
      (error: ErrorEvent) => {
        error.stopPropagation()
        try {
          const info = pick(error, [
            'colno',
            'lineno',
            'filename',
            'target',
            'type',
            'isTrusted',
            'message',
          ])
          const {
            performance,
            clientInformation,
            location,
            screen,
          } = info.target as Window
          const obj = {
            caughtEvent: 'onerror',
            message: info.message,
            timeOrigin: performance.timeOrigin,
            stack: `Error: at ${info.filename} ${info.lineno}:${info.colno}`,
            type: info.type,
            isTrusted: info.isTrusted,
            cookieEnabled: clientInformation.cookieEnabled,
            cookie: document.cookie || '',
            userAgent: clientInformation.userAgent,
            href: location.href,
            screenHeight: screen.availHeight,
            screenWidth: screen.availWidth,
          }
          this.postError(obj)
        } catch (error) {
          throw new Error('Caught By Error Boundaries Self')
        }
      },
      true
    )
    // async code
    window.addEventListener(
      'unhandledrejection',
      (error: PromiseRejectionEvent) => {
        try {
          const info = pick(error, ['type', 'target', 'reason', 'isTrusted'])
          const { message, stack } = info.reason as Error
          const {
            performance,
            clientInformation,
            location,
            screen,
          } = info.target as Window
          const obj = {
            caughtEvent: 'onunhandledrejection',
            message: message,
            timeOrigin: performance.timeOrigin,
            stack: stack,
            type: info.type,
            isTrusted: info.isTrusted,
            cookieEnabled: clientInformation.cookieEnabled,
            cookie: document.cookie || '',
            userAgent: clientInformation.userAgent,
            href: location.href,
            screenHeight: screen.availHeight,
            screenWidth: screen.availWidth,
          }
          this.postError(obj)
        } catch (error) {
          throw new Error('Caught By Error Boundaries Self')
        }
        error.stopPropagation()
      },
      true
    )
  }

  postError = (error: ErrorInfo) => {
    const obj = Object.assign({}, error, {
      app: this.props.app || "unkonwn app",
      user: this.props.user || "unkonwn user",
    })
    this.props.fetch && this.props.fetch(obj)
  }

  render() {
    const { errorRender } = this.props
    if (this.state.hasError) {
      return errorRender ? errorRender : <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary

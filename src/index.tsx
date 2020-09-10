import React from 'react'
import { ErrorCatcherProps, ErrorCatcherState, ErrorInfo } from '../index.d'

class ErrorBoundary extends React.Component<
  ErrorCatcherProps,
  ErrorCatcherState
> {
  constructor(props: ErrorCatcherProps) {
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
          const { colno, lineno, filename, target, type, isTrusted, message } = error
          const {
            performance,
            clientInformation,
            location,
            screen,
          } = target as Window
          const obj = {
            caughtEvent: 'onerror',
            message: message,
            timeOrigin: performance.timeOrigin,
            stack: `Error: at ${filename} ${lineno}:${colno}`,
            type: type,
            isTrusted: isTrusted,
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
          const { type, target, reason, isTrusted } = error
          const { message, stack } = reason as Error
          const {
            performance,
            clientInformation,
            location,
            screen,
          } = target as Window
          const obj = {
            caughtEvent: 'onunhandledrejection',
            message: message,
            timeOrigin: performance.timeOrigin,
            stack: stack,
            type: type,
            isTrusted: isTrusted,
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
    if (process.env.NODE_ENV === 'development') {
      console.table(obj)
    }
    this.props.onCatch && this.props.onCatch(obj)
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

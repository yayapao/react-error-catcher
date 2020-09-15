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
      maps: new Map(),
      timer: null,
    }
  }

  stableMessage = ["Caught By Error Boundaries Self"]
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
    window.addEventListener('error', this.catchError, true)
    // async code
    window.addEventListener('unhandledrejection', this.catchRejectEvent, true)
    // set time watcher
    this.setTimer(true)
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.catchError, true)
    window.removeEventListener(
      'unhandledrejection',
      this.catchRejectEvent,
      true
    )
    this.setTimer(false)
  }

  beforeFilter = (error: ErrorInfo): boolean => {
    const judge = this.stableMessage.concat(this.props.filters ? this.props.filters : [])
    if (error.message) {
      return judge.includes(error.message)
    }
    return true
  }

  filter = (error: ErrorInfo) => {
    // filter by user define
    if (this.beforeFilter(error)) {
      return
    }
    // filter the mutiple items
    const { user, app, timeOrigin, caughtEvent } = error
    const label = `${app}-${user}-${timeOrigin}-${caughtEvent}`
    this.state.maps.set(label, error)
    // post by max
    // 1 means post immediately
    const max = this.props.max || 1
    if (this.state.maps && this.state.maps.size >= max) {
      this.catchBack()
    }
  }

  setTimer = (label: boolean) => {
    if (label) {
      const delay = this.props.delay || 1000 * 60
      setTimeout(() => {
        if (this.state.timer) {
          clearTimeout(this.state.timer)
          this.setState({ timer: null })
        }
        if (this.state.maps && this.state.maps.size > 0) {
          this.catchBack()
        }
        if (process.env.NODE_ENV === 'development') {
          console.log("token active!")
        }
        this.setTimer(true)
      }, delay)
    } else {
      clearTimeout(this.state.timer)
      this.setState({ timer: null })
    }
  }

  catchBack = () => {
    try {
      this.props.onCatch && this.props.onCatch(Array.from(this.state.maps.values()))
      // after callback the maps, then clear
      this.state.maps.clear()
    } catch (error) {
      throw new Error('Caught By Error Boundaries Self')
    }
  }

  postError = (error: ErrorInfo) => {
    const obj = Object.assign({}, error, {
      app: this.props.app || 'unkonwn app',
      user: this.props.user || 'unkonwn user',
    })
    if (process.env.NODE_ENV === 'development') {
      console.table(obj)
    }
    // filter same errors, it will remian the last one
    this.filter(obj)
  }

  catchError = (error: ErrorEvent) => {
    error.stopPropagation()
    try {
      const {
        colno,
        lineno,
        filename,
        target,
        type,
        isTrusted,
        message,
      } = error
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
  }

  catchRejectEvent = (error: PromiseRejectionEvent) => {
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

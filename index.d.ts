import React from 'react'

export interface ErrorInfo {
  app?: string
  // "onerror" | "onunhandledrejection" | "componentDidCatch"
  caughtEvent?: string
  user?: string
  message?: string
  // window.performance.timeOrigin 时间戳
  timeOrigin?: number | string
  // at filepath lineno:colno
  stack?: string
  // event.type 事件类型
  type?: string
  // event.isTrusted 事件触发来源
  isTrusted?: boolean
  // 是否启用 cookie
  cookieEnabled?: boolean
  cookie?: string
  userAgent?: string
  href?: string
  screenHeight?: number | string
  screenWidth?: number | string
}

export interface Error {
  name: string;
  message: string;
  stack?: string;
}

export interface ErrorCatcherState {
  hasError: boolean
  maps: Map,
  timer: any
}

export interface ErrorCatcherProps extends React.Props<ErrorCatcher> {
  errorRender?: React.ReactNode
  user?: string
  app?: string | number
  onCatch?: (error: ErrorInfo[]) => any
  max?: number
  delay?: 5000
  filters?: string[]
}

declare class ErrorCatcher extends React.Component<ErrorCatcherProps, ErrorCatcherState> {}

export default ErrorCatcher
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
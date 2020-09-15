'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.stableMessage = ["Caught By Error Boundaries Self"];
        _this.beforeFilter = function (error) {
            var judge = _this.stableMessage.concat(_this.props.filters ? _this.props.filters : []);
            if (error.message) {
                return judge.includes(error.message);
            }
            return true;
        };
        _this.filter = function (error) {
            // filter by user define
            if (_this.beforeFilter(error)) {
                return;
            }
            // filter the mutiple items
            var user = error.user, app = error.app, timeOrigin = error.timeOrigin, caughtEvent = error.caughtEvent;
            var label = app + "-" + user + "-" + timeOrigin + "-" + caughtEvent;
            _this.state.maps.set(label, error);
            // post by max
            // 1 means post immediately
            var max = _this.props.max || 1;
            if (_this.state.maps && _this.state.maps.size >= max) {
                _this.catchBack();
            }
        };
        _this.setTimer = function (label) {
            if (label) {
                var delay = _this.props.delay || 1000 * 60;
                setTimeout(function () {
                    if (_this.state.timer) {
                        clearTimeout(_this.state.timer);
                        _this.setState({ timer: null });
                    }
                    if (_this.state.maps && _this.state.maps.size > 0) {
                        _this.catchBack();
                    }
                    _this.setTimer(true);
                }, delay);
            }
            else {
                clearTimeout(_this.state.timer);
                _this.setState({ timer: null });
            }
        };
        _this.catchBack = function () {
            try {
                _this.props.onCatch && _this.props.onCatch(__spreadArrays(_this.state.maps.values()));
                // after callback the maps, then clear
                _this.state.maps.clear();
            }
            catch (error) {
                throw new Error('Caught By Error Boundaries Self');
            }
        };
        _this.postError = function (error) {
            var obj = Object.assign({}, error, {
                app: _this.props.app || 'unkonwn app',
                user: _this.props.user || 'unkonwn user',
            });
            if (process.env.NODE_ENV === 'development') {
                console.table(obj);
            }
            // filter same errors, it will remian the last one
            _this.filter(obj);
        };
        _this.catchError = function (error) {
            error.stopPropagation();
            try {
                var colno = error.colno, lineno = error.lineno, filename = error.filename, target = error.target, type = error.type, isTrusted = error.isTrusted, message = error.message;
                var _a = target, performance_1 = _a.performance, clientInformation_1 = _a.clientInformation, location_1 = _a.location, screen_1 = _a.screen;
                var obj = {
                    caughtEvent: 'onerror',
                    message: message,
                    timeOrigin: performance_1.timeOrigin,
                    stack: "Error: at " + filename + " " + lineno + ":" + colno,
                    type: type,
                    isTrusted: isTrusted,
                    cookieEnabled: clientInformation_1.cookieEnabled,
                    cookie: document.cookie || '',
                    userAgent: clientInformation_1.userAgent,
                    href: location_1.href,
                    screenHeight: screen_1.availHeight,
                    screenWidth: screen_1.availWidth,
                };
                _this.postError(obj);
            }
            catch (error) {
                throw new Error('Caught By Error Boundaries Self');
            }
        };
        _this.catchRejectEvent = function (error) {
            try {
                var type = error.type, target = error.target, reason = error.reason, isTrusted = error.isTrusted;
                var _a = reason, message = _a.message, stack = _a.stack;
                var _b = target, performance_2 = _b.performance, clientInformation_2 = _b.clientInformation, location_2 = _b.location, screen_2 = _b.screen;
                var obj = {
                    caughtEvent: 'onunhandledrejection',
                    message: message,
                    timeOrigin: performance_2.timeOrigin,
                    stack: stack,
                    type: type,
                    isTrusted: isTrusted,
                    cookieEnabled: clientInformation_2.cookieEnabled,
                    cookie: document.cookie || '',
                    userAgent: clientInformation_2.userAgent,
                    href: location_2.href,
                    screenHeight: screen_2.availHeight,
                    screenWidth: screen_2.availWidth,
                };
                _this.postError(obj);
            }
            catch (error) {
                throw new Error('Caught By Error Boundaries Self');
            }
            error.stopPropagation();
        };
        _this.state = {
            hasError: false,
            maps: new Map(),
            timer: null,
        };
        return _this;
    }
    /**
     * a static method，usually used to change this.state
     * called in the render time, so no effects!
     * By return a value to change the state, just like setState()
     */
    ErrorBoundary.getDerivedStateFromError = function () {
        // only conponent catchs error, then update state to display downgrade UI
        return {
            hasError: true,
        };
    };
    /**
     * catch React Component render Errors
     * called in commit time
     */
    ErrorBoundary.prototype.componentDidCatch = function (error, info) {
        try {
            var obj = {
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
            };
            this.postError(obj);
        }
        catch (error) {
            throw new Error('Caught By Error Boundaries Self');
        }
    };
    ErrorBoundary.prototype.componentDidMount = function () {
        // event catch
        window.addEventListener('error', this.catchError, true);
        // async code
        window.addEventListener('unhandledrejection', this.catchRejectEvent, true);
        // set time watcher
        this.setTimer(true);
    };
    ErrorBoundary.prototype.componentWillUnmount = function () {
        window.removeEventListener('error', this.catchError, true);
        window.removeEventListener('unhandledrejection', this.catchRejectEvent, true);
        this.setTimer(false);
    };
    ErrorBoundary.prototype.render = function () {
        var errorRender = this.props.errorRender;
        if (this.state.hasError) {
            return errorRender ? errorRender : React__default['default'].createElement("h1", null, "Something went wrong.");
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React__default['default'].Component));

module.exports = ErrorBoundary;

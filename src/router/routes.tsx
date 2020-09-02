import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { routes } from './config'
import { RouteType } from './data.d'

console.log(routes)

function renderRoutes(data: RouteType, prevPath?: string) {
  const { path, name, exact, redirect, routes } = Object.assign(
    {},
    {
      exact: true,
    },
    data
  )
  return (
    <React.Fragment key={name}>
      <Route
        path={`${prevPath ? prevPath : ''}${path}`}
        exact={exact}
        render={(props) => {
          return <data.component {...props} />
        }}
      >
        {redirect?.length > 0 && (
          <Redirect
            to={typeof redirect === 'string' ? redirect : { ...redirect }}
          />
        )}
      </Route>
      {routes &&
        routes.length > 0 &&
        routes.map((item) => {
          return renderRoutes(item, path)
        })}
    </React.Fragment>
  )
}

function RouterRender() {
  return (
    <BrowserRouter>
      {routes.map((item: RouteType, index: number) => {
        return <Switch key={index}>{renderRoutes(item)}</Switch>
      })}
    </BrowserRouter>
  )
}

export default RouterRender

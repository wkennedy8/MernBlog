import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={routeProps =>
        !currentUser ? <Redirect to='/' /> : <Component {...routeProps} />
      }
    />
  )
}

export default PrivateRoute

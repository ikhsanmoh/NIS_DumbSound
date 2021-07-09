import { useContext } from 'react'
import { Route, Redirect } from "react-router-dom";

import { UserContext } from '../../context/userContext';

function PrivateRoute({ children: Component }) {
  const [state, dispatch] = useContext(UserContext)

  return (
    <Route
      render={(props) =>
        state.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute

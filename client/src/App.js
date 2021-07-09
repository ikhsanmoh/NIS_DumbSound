import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from './context/userContext';

import AddMusic from './pages/admin/AddMusic';
import AddArtist from './pages/admin/AddArtist';
import Home from './pages/Home';
import Header from './components/base/Header';
import Payment from './components/payment/Payment';
import ListTrasactions from './pages/admin/ListTrasactions';
import PrivateRoute from './components/routes/PrivateRoute';

import './App.css';

/**
 * TODO: Design routes for admin and user
 */
function App() {
  const [state, dispatch] = useContext(UserContext)
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    if (state.isLogin && state.user.status === '1') {
      setRoutes([
        {
          path: '/',
          exact: true,
          main: () => <ListTrasactions />
        },
        {
          path: '/add-music',
          exact: true,
          main: () => <AddMusic />
        },
        {
          path: '/add-artist',
          exact: true,
          main: () => <AddArtist />
        }
      ])
    } else {
      setRoutes([
        {
          path: '/',
          exact: true,
          main: () => <Home />
        },
        {
          path: '/payment',
          exact: true,
          main: () => <Payment />
        }
      ])
    }
  }, [state.isLogin])

  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          {routes.map((route, index) => {
            if (route.path === '/') {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.main}
                />
              )
            } else {
              return (
                <PrivateRoute
                  key={index}
                  path={route.path}
                  children={route.main}
                />
              )
            }
          })}

          {/* <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/add-music' exact={true}>
            <AddMusic />
          </Route>
          <Route path='/add-artist' exact={true}>
            <AddArtist />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

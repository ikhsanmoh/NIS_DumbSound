import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom'

import AddMusic from './pages/admin/AddMusic';
import AddArtist from './pages/admin/AddArtist';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/add-music' exact={true}>
            <AddMusic />
          </Route>
          <Route path='/add-artist' exact={true}>
            <AddArtist />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

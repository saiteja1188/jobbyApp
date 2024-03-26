import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import LoginRoute from './components/LoginRoute'
import JobsRoute from './components/JobsRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginRoute} />
        <ProtectedRoute exact path="/" component={HomeRoute} />
        <ProtectedRoute exact path="/jobs" component={JobsRoute} />
        <ProtectedRoute
          exact
          path="/jobs/:id"
          component={JobItemDetailsRoute}
        />
        <Route exact path="/not-found" component={NotFoundRoute} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App

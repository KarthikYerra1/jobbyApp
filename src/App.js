import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import Home from './components/Home'
import SpecificJobDetails from './components/SpecificJobDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={SpecificJobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

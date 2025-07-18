import './App.css'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Notfound from './components/Notfound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path='/login' component={Login} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/jobs' component={Jobs} />
      <ProtectedRoute exact path='/jobs/:id' component={JobItemDetails} />
      <Route path='/not-found' component={Notfound} />
      <Redirect path='/not-found' />
    </Switch>
  </div>
)

export default App

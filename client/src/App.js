import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './services/auth';
import OneRepMaxForm from './components/OneRepMaxForm';
import Login from './components/LoginV2';
import Dashboard from './components/Dashboard';
import Error from './components/Error';
import Home from './components/Home';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import useToken from './hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <div className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login setToken={setToken} />
            </Route>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/' component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

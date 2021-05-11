import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './services/auth';
import OneRepMaxForm from './components/OneRepMaxForm';
import Login from './components/LoginV2';
import Dashboard from './components/Dashboard';
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
              <OneRepMaxForm />
            </Route>
            <Route path='/login'>
              <Login setToken={setToken} />
            </Route>
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

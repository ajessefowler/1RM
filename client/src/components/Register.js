import React, { useState, useRef } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from '../services/auth';
import { useHistory } from 'react-router-dom';
import Home from './Home';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
      );
    }
};

function Register({setToken}) {
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const onChangeUsername = (e) => {
      setUsername(e.target.value);
    };
  
    const onChangePassword = (e) => {
      setPassword(e.target.value);
    };

    const handleRegister = async e => {
        e.preventDefault();
    
        setMessage('');
        setLoading(true);
    
        form.current.validateAll();
    
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, password)
            .then(data => {
                if (localStorage.getItem('username') && localStorage.getItem('token') != 'null') {
                    console.log(localStorage.getItem('username'));
                    console.log(localStorage.getItem('token'));
                    console.log(data);
                    if (setToken) setToken(localStorage.getItem('token'));
                    history.push('/dashboard');
                } else {
                    setLoading(false);
                    setMessage('Username already taken.');
                }
            })
            .catch(error => {
                setLoading(false);
                setMessage(error.toString());
            });
        } else {
          setLoading(false);
        }
    }

    // If there is already a token, prevent user from logging in again
    return localStorage.getItem('token') ? <Home /> : (
        <div className="col-md-12">
          <div className="card card-container register">
            <h3>Register</h3>
    
            <Form onSubmit={handleRegister} ref={form}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
                />
              </div>
    
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Register</span>
                </button>
              </div>
    
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </div>
      );
}

export default Register;
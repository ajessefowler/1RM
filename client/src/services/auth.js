import authHeader from './authHeader';

const REGISTER_URL = 'http://localhost:3001/api/auth/register';
const LOGIN_URL = 'http://localhost:3001/api/auth/login';
const VERIFY_URL = 'http://localhost:3001/api/auth/isLoggedIn';

async function register(username, password) {
    const input = {username: username, password: password};

    await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(dataJson => {
        if (dataJson.token) localStorage.setItem('token', dataJson.token);
        if (dataJson.user) {
            localStorage.setItem('username', dataJson.user.username);
            localStorage.setItem('userId', dataJson.user._id);
            localStorage.setItem('units', dataJson.user.units);
        } 
        return dataJson;
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

async function login(username, password) {
    const input = {username: username, password: password};

    await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(dataJson => {
        if (dataJson.token) localStorage.setItem('token', dataJson.token);
        if (dataJson.user) {
            localStorage.setItem('username', dataJson.user.username);
            localStorage.setItem('userId', dataJson.user._id);
            localStorage.setItem('units', dataJson.user.units);
        }
        return dataJson;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

const isLoggedIn = () => {
    if (!localStorage.getItem('token') || !localStorage.getItem('username')) return false;

    const verifyHeaders = new Headers();
    verifyHeaders.append('Content-Type', 'application/json');
    verifyHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    fetch(VERIFY_URL, {
        method: 'POST',
        headers: verifyHeaders
    })
    .then(response => response.json())
    .then (dataJson => {
        console.log(dataJson);
        return false;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const functions = {register, login, logout, isLoggedIn};

export default functions;
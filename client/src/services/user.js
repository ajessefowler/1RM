import authHeader from './authHeader';
const BASE_URL = 'http://localhost:3001/api';

async function addLift(name, username) {
    const input = {name: name, username: username};

    await fetch(BASE_URL + '/lifts/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(input)
    })
    .then(response => response.json())
    .then(dataJson => {
        // if (dataJson.token) localStorage.setItem('token', dataJson.token);
        // if (dataJson.user) localStorage.setItem('username', dataJson.user.username);
        // console.log(dataJson);
        return dataJson;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
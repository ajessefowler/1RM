export default function authHeader() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (username && token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }
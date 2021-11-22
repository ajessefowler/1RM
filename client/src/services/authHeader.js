export default function authHeader() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (username && token) {
      return { 'x-access-token': token };
    } else {
      return {};
    }
  }
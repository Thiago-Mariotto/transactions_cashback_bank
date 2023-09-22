import * as jose from 'jose';

//const navigate = useNavigate();

export function getToken() {
  return localStorage.getItem('token');
}

export function decodeToken() {
  const token = getToken();
  if (token) {
    const decodedToken = jose.decodeJwt(token);
    console.log(decodedToken);
    return decodedToken;
  }
};

export function hasSession() {
  const token = localStorage.getItem('token');
  return token !== null;
}

export function protectedRoute() {
  if (!hasSession()) {
    alert('You need to login to access this page');
    //navigate('/', { replace: true })
  }
}
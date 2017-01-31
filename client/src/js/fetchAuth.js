require('isomorphic-fetch');
import cookie from 'react-cookie';


export default function fetchAuth(method, url, obj) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${cookie.load('accessToken')}`);

  const init = {
    method: method,
    body: JSON.stringify(obj),
    headers: myHeaders
  }

  return fetch(url, init).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response;
  })
  .then((response) => {
    return response.json();
  })
}

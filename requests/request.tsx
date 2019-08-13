export function checkUser(user: {}) {
  fetch('http://localhost:5000/login', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then((res) => {
      localStorage.setItem('access token', `${res.token}`);
    });
}

export function checkCode(user: {}) {
  fetch('http://localhost:5000/code', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access token')}`,
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then((res) => {
      localStorage.setItem('refresh token', `${res.refreshToken}`);
    });

}

export function getTokenRefresh() {
  fetch('http://localhost:5000/refreshtoken', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('refresh token')}`,
    },
  })
    .then(res => res.json())
    .then((res) => {
      localStorage.setItem('access token', `${res.token}`);
      localStorage.setItem('refresh token', `${res.refreshToken}`);
    });
}

// export function getContracts() {

// }

export async function checkUser(user: {}) {
  await fetch('http://localhost:5000/login', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then((res) => {
      localStorage.setItem('access token', `${res.token}`);
      localStorage.setItem('refresh token', `${res.refreshToken}`);
    });

  await fetch('http://localhost:5000/token', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access token')}`,
    },
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
  });
}

export async function checkCode(user: {}) {
  const res =
    await fetch('http://localhost:5000/code', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
}
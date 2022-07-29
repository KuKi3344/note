// eslint-disable-next-line @iceworks/best-practices/no-http-url
const baseUrl = 'http://127.0.0.1:8848';

export function getallUser(url) {
  // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
  return fetch(`${baseUrl}${url}`, {
    method: 'GET',
  });
}

export function AddUser(url, body) {
  // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function UpdateUser(url, body) {
  // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function DeleteUser(url, id) {
  // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
  return fetch(`${baseUrl}${url}/${id}`, {
    method: 'POST',
  });
}

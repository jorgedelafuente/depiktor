const BASE_URL = 'http://localhost:3001';

function getTechnologies() {
  return fetchRequest('/');
}

function fetchRequest(path, options) {
  return fetch(BASE_URL + path, options)
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => (res.status !== 204 ? res.json() : res))
    .catch(
      (err) =>
        console.log(`Error fetching [${options ? options.method : `GET`}]`, err) // eslint-disable-line
    );
}

export default {
  getTechnologies,
};
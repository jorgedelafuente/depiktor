// Uncomment lines 3 and 9, while commenting out lines 7 to use mock data in place of the database.

// import mongoMocks from './../__mocks__/mongoMocks.json'; // Import mock data.
const BASE_URL = 'http://localhost:3001';

function getTechnologies() {
  return fetchRequest('/tweetdata'); // Comment this out if you want to use mock data.

  // return Promise.resolve(mongoMocks); // Use this lines to access mock data for the client.
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

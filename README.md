# depiktor

Web application integrated with Twitter API to display current trends in technology.

![Alt text](/assets/depiktor.png?raw=true "Optional Title")

## Tech Stack

### Front End

ChartJS
Jest
React
React Testing Library
SASS

### Back End

Express
Jasmine
MongoDB
Mongoose
NodeJS

## Installation

1. Clone the repository.
2. Run `npm install` in both the server and client folders.
3. Create an .env file in your client root folder with `SKIP_PREFLIGHT_CHECK=true`.
4. Create an .env file in your server root folder with the environment variables shown below.
5. Run nodemon in the server root folder.
6. Populate the database with data (or use mock data).
7. Run `npm start` in your client root folder.

## Loading and configuring the module

For this project, we use a MongoDB database along with some Twitter API keys. Set up and run your MongoDB database.

Create a .env file in the server folder with the following variables:

    TWITTER_CONSUMER_KEY=TWITTER_CONSUMER_KEY
    TWITTER_CONSUMER_SECRET=TWITTER_CONSUMER_SECRET
    HOST=localhost
    PORT=3001
    DB_URI=MONGODB_URI

## How to get Twitter Data

First, run create_technologies.js file under the folder migrations using Node.

Next, run background_worker.js and background_worker_2.js. These programs will run at the indicated time and populate the database with data through Twitter API calls. They are schedule to run once every hour, and each background worker populates half of the database.

The goal is to have the database populated with data over several days.

## Using Mock Data

In the ApiClient.js file of the service folder (client/src/service), follow the instructions at the top of the file to use mock data for the client instead of the database.

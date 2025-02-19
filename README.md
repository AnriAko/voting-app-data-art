# Voting Game

Voting Game is a web application where users can vote on jokes using emojis! The app fetches jokes from an external API and provides functionality for voting, editing, and deleting jokes.

## How to Run

To get the project up and running, follow these simple steps:

### 1. Install Dependencies

In the root directory of the project, run the following command to install the dependencies:

npm install

### 2. Set Up Environment Variables

To make the app work, you'll need to set up a few environment variables.

Create a `.env` file in the root of your project and add the following lines:

DB_URI=your_database_connection_string
NODE_ENV=development
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

`DB_URI` — The connection string to your database (e.g., MongoDB).
`NODE_ENV=development` — Specifies that the app will run in development mode.
`NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000` — The URL for the frontend used when interacting with the backend.

### 3. Start the App

Once you have set up the environment variables, start the app:
npm run dev
The app will be available at [http://localhost:3000](http://localhost:3000).

## How the App Works

### 1. Jokes

The app fetches jokes from an external API — [TeeHee Joke API](https://teehee.dev/api/joke). These jokes are used as the content displayed to users.

### 2. Backend

In `api/joke.ts`, there is an API that saves jokes to the database and sends them to the client. The database stores:

-   The text of the joke
-   The vote counts for each emoji

### 3. Frontend

On the client side:

-   The user can vote for jokes using emojis.
-   The "Next Joke" button fetches a new joke.
-   There are buttons for adding, editing, and deleting votes.
-   The app also provides a menu for deleting and editing jokes.

## Data Structure

Each joke in the database looks like this:

json

CopyEdit

`{
  "id": "unique_joke_id",
  "question": "Why did the developer go broke?",
  "answer": "Because he used up all his cache!",
  "votes": [
    { "value": 10, "label": "😂" },
    { "value": 5, "label": "👍" },
    { "value": 3, "label": "❤️" }
  ],
  "availableVotes": ["😂", "👍", "❤️"]
}
`

-   `votes` — A list of emojis with their corresponding vote counts.
-   `availableVotes` — Available emojis for voting.

## Frontend

The frontend uses React, and styling is done with Tailwind CSS.
Includes responsive design

### Key Features:

-   A random joke is displayed on the screen.
-   Users can vote on the joke using emojis.
-   The "Next Joke" button loads a new joke.
-   There is a menu to edit, delete jokes, and add votes.

## Backend

### API Endpoints:

1. **GET /api/joke** — Fetch a random joke.
2. **POST /api/joke/:id** — Vote for a joke.
3. **DELETE /api/joke/:id** — Delete a joke.
4. **UPDATE /api/joke/:id** — Update the content of a joke.

link of hosted app:
https://voting-app-data-art-production.up.railway.app/
(P.S some styles not working on hosted app)

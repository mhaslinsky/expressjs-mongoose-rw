# Dissonance (Backend)

This project started out as a brief case study to learn socket.io by creating a simple chat app and then implement those newly
learned technologies into my other
project, [Insta-sham](https://github.com/mhaslinsky/imagesplaces). However after spending sometime with this, it expanded a bit
beyond its inital scope and became a testbed to learn alternatives for implementing authentication, form logic, and CSS in JS.
In my previous project, referenced above, I created all of those, for all intents and purposes, from the ground up. This time,
I learned why it is commonly said not to reinvent the wheel.

This project does have a frontend hosted, the repo can be found [here](https://github.com/mhaslinsky/chatappFE).
It does not have persistant storage, no database is used. Chat data is stored via express and user data via local storage.
This project could be expanded to allow user creation of accounts, servers, rooms, etc. However, I felt that to be
redudant for my learning purposes, but could see it used as a great springboard for someone looking to learn a DB technology.

## Demo

**Client:** https://chatapp-fe-eta.vercel.app/

## Tech Stack

**Client:** React, NextJS, Next-Auth, React-hook-form, Socket.io-Client, ChakraUI, React-Icons, React-Swipeable

**Server:** Node, Express, Socket.io-Server

## Features

- Change rooms, and send messages
- Light/dark mode toggle
- User persistance, both live connections to room and logged in users to server
- Responsive, both mobile and desktop versions.

## Run Locally

Clone the project

```bash
  git clone https://github.com/mhaslinsky/chatappFE
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Console should confirm your socket.io server is running on the port set in your environment variables

## Environment Variables

To run this project, you will need to add the following environment variable to your .env file

`PORT` the port you would like your socket.io server to run on

## License

[MIT](https://choosealicense.com/licenses/mit/)

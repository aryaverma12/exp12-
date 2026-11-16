# MERN Task Manager

A simple full-stack task manager built with MongoDB, Express, React, and Node.js.

## Features
- Add tasks
- View saved tasks
- Delete tasks
- Store tasks in MongoDB Atlas

## Run locally
1. Install Node.js.
2. Run `npm install`.
3. Create a `.env` file using `.env.example` and add your MongoDB Atlas connection string.
4. In one terminal, run `npm run server`.
5. In another terminal, run `npm run dev`.
6. Open the local Vite URL shown in the terminal.

## Deploy on Render
- Create a Web Service connected to this repository.
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Add environment variable `MONGO_URI` with your MongoDB Atlas connection string.

The Express server serves the built React frontend and the API from the same service.
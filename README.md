# Video Conferencing Application

## Project Overview

GroupStudy Platform is a real-time video conferencing application designed for seamless collaborative learning. It allows users to instantly join study groups by simply typing a subject name, eliminating the need for invite links. Users can create rooms, join ongoing sessions, and interact through video calls and chat messaging, making group study more accessible and effective.

### Problem Statement

In today’s digital world, students face limited interactive learning and isolation in virtual classrooms. Existing platforms lack seamless group collaboration and often require complex setups or paid services. GroupStudy Platform solves this by providing a hassle-free, real-time communication tool where users can instantly search, join, or create study groups using just a subject name, enabling effortless and engaging learning experiences.

### Key Features

- *User Authentication*: Secure signup and login functionality
- *Room Creation*: Create custom rooms for video conferencing
- *Real-time Video Streaming*: Connect with multiple users through video
- *Chat Messaging*: Text-based communication alongside video
- *Persistent Chat History*: Chat messages are saved for the duration of the session
- *User Presence Indicators*: See who has joined or left the room

## Dependencies

### Server-Side Dependencies

```
json
{
  "cors": "^2.8.5",
  "cross-env": "^7.0.3",
  "dotenv": "^8.2.0",
  "express": "^4.17.1",
  "mongoose": "^8.9.2",
  "socket.io": "^2.3.0"
}
```


### Client-Side Dependencies
```
json
{
  "@google/generative-ai": "^0.21.0",
  "@testing-library/jest-dom": "^4.2.4",
  "@testing-library/react": "^9.3.2",
  "@testing-library/user-event": "^7.1.2",
  "axios": "^1.7.9",
  "cross-env": "^7.0.3",
  "react": "^16.13.1",
  "react-dom": "^16.13.1",
  "react-router-dom": "^5.3.4",
  "react-scripts": "3.4.1",
  "simple-peer": "9.6.2",
  "socket.io-client": "^2.3.0",
  "styled-components": "^5.1.0",
  "uuid": "^7.0.3"
}
```

## Setup Instructions

### Prerequisites

- Node.js (v12.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Modern web browser (Chrome, Firefox, Edge recommended)

### Installation

1. *Clone the repository*
   bash
   git clone <repository-url>
   cd mini_project
   

2. *Install server dependencies*
   bash
   npm install
   

3. *Install client dependencies*
   bash
   cd client
   npm install
   cd ..
   

4. *Environment Configuration*
   
   Create a .env file in the root directory with the following variables:
   
   MONGO_URI=mongodb://127.0.0.1:27017/userdb
   ### For production, use your MongoDB Atlas connection string
   ### MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/userdb
   

5. *Start the server*
   bash
   npm start
   

6. *Start the client (in a separate terminal)*
   bash
   cd client
   npm start
   

7. *Access the application*
   
   Open your browser and navigate to:
   
   https://your_ip:3000
   
   or
   
   https://localhost:3000
   

### Usage Guide

1. *Sign Up*
   - Navigate to the signup page
   - Enter your name and email
   - Click "Sign Up"

2. *Login*
   - Navigate to the login page
   - Enter your registered email
   - Click "Login"

3. *Create a Room*
   - After logging in, you'll be directed to the create room page
   - Click "Create Room" to generate a new room

4. *Join a Room*
   - Share the room URL with others
   - Others can join by navigating to the URL
   - Alternatively, they can enter the room ID on the join room page

5. *Using the Video Conference*
   - Grant camera and microphone permissions when prompted
   - Use the chat feature on the right side to send messages
   - All participants in the room will be visible in the video grid

## Architecture

The application follows a client-server architecture:

- *Frontend*: React.js application with Socket.io client for real-time communication
- *Backend*: Node.js with Express server, Socket.io for WebSocket connections
- *Database*: MongoDB for user data storage
- *Real-time Communication*: WebRTC (via simple-peer) for peer-to-peer video streaming

## Future Plans

- Enables students to code collaboratively in real-time. Provide guidance  on syntax errors with explanations rather than AI-generated solutions,  promoting learning over shortcuts.
- Add end-to-end encryption for enhanced security
- Implement screen sharing functionality
- Add recording capabilities for video sessions
- Develop mobile applications for iOS and Android
- Implement user profiles with customizable settings
- Add virtual background options

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Sachin Kiragi - Lead Developer
- Ashutosh Naryagol -Developer
- Shailesh Pawale - Developer
- Kadappa Savalagi -Developer

## Troubleshooting

If you encounter SSL certificate issues during development:
1. For development purposes, the application can run on HTTP instead of HTTPS
2. If using HTTPS, you may need to accept self-signed certificates in your browser
3. For API requests, the application includes options to bypass SSL certificate validation in development mode

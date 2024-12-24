import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/CreateRoom.css'

const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const history = useHistory();

    function create() {
        if (roomName.trim()) {
            history.push(`/room/${roomName}`);
        } else {
            alert("Please enter a room name!");
        }
    }

    useEffect(()=>{
        window.localStorage.clear();
    })

    return (
        <div className="create-room-container">
            <h1 className="project-title">Group Study Platform</h1>
            <p className="description">
                Welcome to the Group Study Platform! Collaborate and learn with peers by creating or joining study rooms. 
                Share knowledge, solve problems, and make learning interactive and engaging.
            </p>

            <div className="form-container">
                <input
                    className="room-input"
                    type="text"
                    placeholder="Enter Room Name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <div className="button-group">
                    <button className="action-button" onClick={create}>Create Room</button>
                    <button className="action-button" onClick={create}>Join Room</button>
                </div>
            </div>

            <div className="features-container">
                <h2 className="features-title">Key Features</h2>
                <ul className="features-list">
                    <li>🛠️ Easy room creation and joining</li>
                    <li>📹 Real-time video collaboration</li>
                    <li>💬 Interactive messaging system</li>
                    <li>📚 Subject-specific study rooms</li>
                </ul>
            </div>

            <footer className="footer">
                <p>
                    Built for effective group studies <br />
                    <strong>Happy Learning!</strong>
                </p>
            </footer>
        </div>
    );
};

export default CreateRoom;

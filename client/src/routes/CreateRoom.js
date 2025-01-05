import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/CreateRoom.css'
import { useEmail } from "../context/EmailContext";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const history = useHistory();

    const {emailInContext, setEmailInContext} = useEmail();

    function create() {
        if (roomName.trim()) {
            history.push(`/room/${roomName}`);
        } else {
            alert("Please enter a room name!");
        }
    }

    useEffect(()=>{
        let myEmail = window.localStorage.getItem("myEmail");
            window.localStorage.clear(); // Clears all other localStorage data
            window.localStorage.setItem("myEmail", myEmail); // Restore the myEmail value
            console.log("Restored myEmail:", window.localStorage.getItem("myEmail"));

            setEmailInContext(myEmail);

    }, [])

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
                    <button className="action-button" onClick={()=>window.location.href='login'}>Log Out</button>
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

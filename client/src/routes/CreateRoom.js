import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { useEffect } from "react";

const CreateRoom = (props) => {
    const [roomName, setRoomName] = useState('');
    function create() {
        const id = roomName;
        props.history.push(`/room/${id}`);
    }


    return (
        <div>
            <input value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
            <button onClick={create}>Create room</button>
            <button onClick={create}>Join room</button>

        </div>
    );
};

export default CreateRoom;

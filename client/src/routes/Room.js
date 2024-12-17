import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: space-evenly;
  padding: 1rem;
`;

const Container = styled.div`
  flex: 0 0 65%;
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  height: fit-content;
  justify-content: space-evenly;
`;

const MessageBox = styled.div`
  flex: 0 0 25%;
  border: 1px solid green;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StyledVideo = styled.video`
  height: 20rem;
  width: 26rem;
  border: 2px solid black;
  object-fit: cover;
`;

const Video = React.memo((props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [props.peer]);

  return <StyledVideo playsInline autoPlay ref={ref} />;
});

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const roomID = props.match.params.roomID;

  useEffect(() => {
    socketRef.current = io.connect("https://192.168.29.188:8181");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  const iceServers = [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ];

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: { iceServers },
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      config: { iceServers },
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function sendMessage() {
    socketRef.current.emit("send message", { roomID, message: inputMessage });
    setInputMessage("");
  }

  useEffect(() => {
    socketRef.current.on("receive message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, []);

  function createMessageDiv(msg) {
    return (
      <div style={{ margin: "1rem" }} key={msg.from + msg.message}>
        <h5>:{msg.from}</h5>
        <h3 style={{ margin: ".5rem" }}>{msg.message}</h3>
      </div>
    );
  }

  return (
    <Wrapper style={{ display: "flex", gap: "2rem" }}>
      <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
      </Container>

      <MessageBox>
        <div
          style={{
            overflowY: "scroll",
            height: "calc(100% - 3rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {messages.map((msg) => createMessageDiv(msg))}
        </div>

        <div
          style={{
            border: "2px solid red",
            height: "3rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "0",
            backgroundColor: "white",
          }}
        >
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={{ width: "75%", height: "100%" }}
            placeholder="Enter your message"
          />
          <button
            style={{ width: "20%", height: "100%" }}
            onClick={() => (inputMessage.length ? sendMessage() : "")}
          >
            Send
          </button>
        </div>
      </MessageBox>
    </Wrapper>
  );
};

export default Room;

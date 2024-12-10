import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";


const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(async() => {
        socketRef.current = io.connect("https://192.168.29.188:8181");
        await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
                console.log("PEERRSS: ", peers);
                
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
                console.log("user", peers);
                
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    // const iceServers = [
    //     {
    //         urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
    //     },
    //     // Add TURN server configuration if needed
    //     // {
    //     //     urls: 'turn:your-turn-server-url',
    //     //     username: 'your-username',
    //     //     credential: 'your-credential'
    //     // },
    // ];
    

        const iceServers = [
            {
                urls:[
                  'stun:stun.l.google.com:19302',
                  'stun:stun1.l.google.com:19302'
                ]
            }
        ]

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: { iceServers }, // Add ICE servers here,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        console.log("peer", peer);
        

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: { iceServers }, // Include ICE servers
            stream,
        });
    
        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID });
        });
    
        peer.on("stream", stream => {
            console.log("Stream received from peer:", stream);
        });
    
        peer.signal(incomingSignal);
    
        return peer;
    }
    
    // Debug in Video Component
    const Video = (props) => {
        const ref = useRef();
    
        useEffect(() => {
            props.peer.on("stream", stream => {
                console.log("Video component stream received:", stream);
                ref.current.srcObject = stream;
            });
        }, [props.peer]);
    
        return <StyledVideo playsInline autoPlay ref={ref} />;
    };
    

    return (
        <Container>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.length}
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
};

export default Room;

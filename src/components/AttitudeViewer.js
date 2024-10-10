import React, { useState, useEffect } from 'react';
import {Canvas, extend } from 'react-three-fiber';
import '../css/AttitudeViewer.css';
import {OrbitControls} from "@react-three/drei";
import RotatingObject from "./RotatingObject";

extend({ OrbitControls });

const AttitudeViewer = () => {

    const [rotationData, setRotationData] = useState([0, 0, 0]);
    const [connection, setConnection] = useState(null);
    const [reconnect, setReconnect] = useState(false);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
            console.log("Connected to server");
            setConnection(true);
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            setRotationData(data);
        };

        ws.onclose = () => {
            console.log("Connection closed");
            setConnection(false);
        };

        return () => {
            ws.close();
        };
    }, [reconnect]);

    // The main component renders the canvas, the play/pause button, the slider, and the frame number
    return (
        <div className="mainDiv">
            <Canvas className="canvas" camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <RotatingObject rotationValues={rotationData ? rotationData : [0, 0, 0]} />
                <OrbitControls />
            </Canvas>

            <div className="RotationValues">
                <p>X: {rotationData[0] * (180/Math.PI)}°</p>
                <p>Y: {rotationData[1] * (180/Math.PI)}°</p>
                <p>Z: {rotationData[2] * (180/Math.PI)}°</p>
            </div>

            <div className="WebsocketConnection">
                <p className={connection ? "WSConnected" : "WSDisconnected"}>Connection status: {connection ? "Connected" : "Disconnected"}</p>
                { !connection && <button onClick={() => setReconnect(!reconnect)}>Reconnect</button>}
            </div>

        </div>
    );
};

export default AttitudeViewer

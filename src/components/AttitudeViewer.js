import React, { useState, useEffect } from 'react';
import {Canvas, extend } from 'react-three-fiber';
import '../css/AttitudeViewer.css';
import {OrbitControls} from "@react-three/drei";
import RotatingObject from "./RotatingObject";
import rotationData from "../data/rotationData";
import GraphPopup from "./GraphPopup";

extend({ OrbitControls });

// This function converts a frame number to a time string
function frameToTime(frame) {
    let seconds = frame / 10;

    let minutes = Math.floor(seconds / 60);


    let milliseconds = frame % 10 * 100;

    seconds = Math.floor(seconds % 60);

    // Pad the minutes, seconds, and milliseconds with leading zeros if needed
    // The format becomes MM:SS:MMM
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

const AttitudeViewer = () => {

    // The current frame and whether the animation is playing or not
    // is stored in the state
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [graphStates, setGraphStates] = useState({
        accelerationGraph: false,
        velocityGraph: false,
        altitudeGraph: false,
    });
    const [rotationData, setRotationData] = useState([0, 0, 0]);
    const [connection, setConnection] = useState(null);

    // This effect is called whenever the current frame or the isPlaying state changes
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
        };

        return () => {
            ws.close();
        }
    }, []);

    const handleGraphButtonClick = (type) => {
        setGraphStates((prev) => {
            return {...prev, [`${type}Graph`]: true};
        });
    };

    const handleCloseGraph = (type) => {
        setGraphStates((prev) => ({ ...prev, [`${type}Graph`]: false }));
    };


    // The main component renders the canvas, the play/pause button, the slider, and the frame number
    return (
        <div className="mainDiv">
            <Canvas className="canvas" camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <RotatingObject rotationValues={rotationData ? rotationData : [0, 0, 0]} />                {/*<XYZArrows />*/}
                <OrbitControls />
                {/*<arrowHelper args={[new Vector3(0, -1, 0), new Vector3(0,
                 0, 0), 7, 'red']} />*/}
            </Canvas>

            <div className="RotationValues">

            <p>Rotation i xyz</p>
            <p>X: {rotationData[0] * (180/Math.PI)}°</p>
            <p>Y: {rotationData[1] * (180/Math.PI)}°</p>
            <p>Z: {rotationData[2] * (180/Math.PI)}°</p>
                <p>Frame : {currentFrame}</p>

            </div>

            <div className="graphButtons">
                <button className={graphStates.accelerationGraph ? "graphButton active" : "graphButton"} onClick={graphStates.accelerationGraph ? () => handleCloseGraph("acceleration") : () => handleGraphButtonClick("acceleration")}>
                    Acceleration
                </button>
                <button className={graphStates.velocityGraph ? "graphButton active" : "graphButton"} onClick={graphStates.velocityGraph ? () => handleCloseGraph("velocity") : () => handleGraphButtonClick("velocity")}>
                    Velocity
                </button>
                <button className={graphStates.altitudeGraph ? "graphButton active" : "graphButton"} onClick={graphStates.altitudeGraph ? () => handleCloseGraph("altitude") : () => handleGraphButtonClick("altitude")}>
                    Altitude
                </button>
            </div>

            {graphStates.accelerationGraph && (
                <GraphPopup type="acceleration" frame={currentFrame} onClose={() => handleCloseGraph("acceleration")} />
            )}
            {graphStates.velocityGraph && (
                <GraphPopup type="velocity" frame={currentFrame} onClose={() => handleCloseGraph("velocity")} />
            )}
            {graphStates.altitudeGraph && (
                <GraphPopup type="altitude" frame={currentFrame} onClose={() => handleCloseGraph("altitude")} />
            )}

            <div className="WebsocketConnection">
                <p className={connection ? "WSConnected" : "WSDisconnected"}>Connection status: {connection ? "Connected" : "Disconnected"}</p>
            </div>

        </div>
    );
};

export default AttitudeViewer

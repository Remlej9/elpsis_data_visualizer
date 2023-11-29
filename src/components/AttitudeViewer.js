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
    const [showGraph, setShowGraph] = useState(false);

    // This effect is called whenever the current frame or the isPlaying state changes
    useEffect(() => {
        let animationTimeout;

        // This function is called recursively to play the animation
        const playAnimation = () => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % rotationData.length);
            animationTimeout = setTimeout(playAnimation, 100); // Set a delay of 100 milliseconds (1 second)
        };

        if (isPlaying) {
            animationTimeout = setTimeout(playAnimation, 100); // Start the animation with a delay
        }

        // This function is called when the component is unmounted
        return () => clearTimeout(animationTimeout);
    }, [isPlaying, rotationData]);

    // This function is called when the play/pause button is clicked
    const handlePlayClick = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    // This function is called when the slider is moved
    const handleSliderChange = (event) => {
        setCurrentFrame(parseInt(event.target.value, 10));
    };

    const handleGraphButtonClick = () => {
        setShowGraph(true);
    };

    const handleCloseGraph = () => {
        setShowGraph(false);
    };

    // The main component renders the canvas, the play/pause button, the slider, and the frame number
    return (
        <div className="mainDiv">
            <Canvas className="canvas" camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={Math.PI / 2}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <RotatingObject rotationValues={rotationData[currentFrame]} />
                {/*<XYZArrows />*/}
                <OrbitControls />
                {/*<arrowHelper args={[new Vector3(0, -1, 0), new Vector3(0,
                 0, 0), 7, 'red']} />*/}
            </Canvas>

            <div className="controls">
                <button
                    className="playButton"
                    onClick={handlePlayClick}>{isPlaying ? 'Pause' : 'Play'}
                </button>

                <span className="frameNumber">T- {frameToTime(currentFrame)}</span>

                <div className="timeline">

                    <input
                        type="range"
                        min="0"
                        max={rotationData.length - 1}
                        value={currentFrame}
                        onChange={handleSliderChange}
                    />

                </div>

                <button className="graphButton" onClick={handleGraphButtonClick}>
                    Show Graph
                </button>

            </div>

            <div className="RotationValues">

            <p>Rotation i xyz</p>
            <p>X: {rotationData[currentFrame][0] * (180/Math.PI)}°</p>
            <p>Y: {rotationData[currentFrame][1] * (180/Math.PI)}°</p>
            <p>Z: {rotationData[currentFrame][2] * (180/Math.PI)}°</p>
                <p>Frame : {currentFrame}</p>

            </div>

            {showGraph && (
                <GraphPopup frame={currentFrame} onClose={handleCloseGraph} />
            )}
        </div>
    );
};

export default AttitudeViewer

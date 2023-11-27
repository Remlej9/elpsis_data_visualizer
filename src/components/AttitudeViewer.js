import React, { useState, useEffect } from 'react';
import {Canvas, extend } from 'react-three-fiber';
import '../css/AttitudeViewer.css';
import {OrbitControls} from "@react-three/drei";
import XYZArrows from "./XYZArrows";
import RotatingObject from "./RotatingObject";
import rotationData from "../data/rotationData";
import {Vector3} from "three";

extend({ OrbitControls });

const AttitudeViewer = () => {

    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let animationTimeout;

        const playAnimation = () => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % rotationData.length);
            animationTimeout = setTimeout(playAnimation, 100); // Set a delay of 1000 milliseconds (1 second)
        };

        if (isPlaying) {
            animationTimeout = setTimeout(playAnimation, 100); // Start the animation with a delay
        }

        return () => clearTimeout(animationTimeout);
    }, [isPlaying, rotationData]);

    const handlePlayClick = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const handleSliderChange = (event) => {
        setCurrentFrame(parseInt(event.target.value, 10));
    };

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

                <span className="frameNumber">Tidpunkt: {currentFrame/10}</span>

                <div className="timeline">

                    <input
                        type="range"
                        min="0"
                        max={rotationData.length - 1}
                        value={currentFrame}
                        onChange={handleSliderChange}
                    />

                </div>
            </div>
        </div>
    );
};

export default AttitudeViewer

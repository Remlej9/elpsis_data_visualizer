import React, { useRef, useState, useEffect } from 'react';
import {Canvas, extend, useFrame} from 'react-three-fiber';
import './App.css';
import {OrbitControls} from "@react-three/drei";
import { Vector3 } from 'three';

extend({ OrbitControls });

const Arrow = ({ position, direction, color }) => {
    const arrowRef = useRef();

    useFrame(({camera}) => {
        arrowRef.current.setDirection(direction.clone().applyQuaternion(camera.quaternion));
    });

    return (
        <arrowHelper ref={arrowRef} args={[direction, new Vector3(0, 0, 0), 1, color]} />
    );
}

const XYZArrows = () => {
    return (
        <>
            <Arrow direction={new Vector3(1, 0, 0)} color="red" />
            <Arrow direction={new Vector3(0, 1, 0)} color="green" />
            <Arrow direction={new Vector3(0, 0, 1)} color="blue" />
        </>
    );
}

const RotatingObject = ({ rotationValues }) => {
    const groupRef = useRef();

    useFrame(() => {
        const [x, y, z] = rotationValues;
        groupRef.current.rotation.set(x, y, z);
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[1, 2, 32]} attach="geometry"/>
                <meshStandardMaterial color="hotpink" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 32]} attach="geometry"/>
                <meshStandardMaterial color="blue" />
            </mesh>
        </group>
    );
};

const App = () => {

    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const rotationData = [
        [0, 0, 0],
        [(Math.PI/10), 0, 0],
        [(Math.PI/10)*2, 0, 0],
        [(Math.PI/10)*3, 0, 0],
        [(Math.PI/10)*4, 0, 0],
        [(Math.PI/10)*5, 0, 0],
        [(Math.PI/10)*6, 0, 0],
        [(Math.PI/10)*7, 0, 0],
        [(Math.PI/10)*8, 0, 0],
        [(Math.PI/10)*9, 0, 0],
        [(Math.PI/10)*10, 0, 0],
        [(Math.PI/10)*11, 0, 0],
        [(Math.PI/10)*12, 0, 0],
        [(Math.PI/10)*13, 0, 0],
        [(Math.PI/10)*14, 0, 0],
        [(Math.PI/10)*15, 0, 0],
        [(Math.PI/10)*16, 0, 0],
        [(Math.PI/10)*17, 0, 0],
        [(Math.PI/10)*18, 0, 0],
        [(Math.PI/10)*19, 0, 0],
        [(Math.PI/10)*20, 0, 0],
        [0, (Math.PI/10), 0],
        [0, (Math.PI/10)*2, 0],
        [0, (Math.PI/10)*3, 0],
        [0, (Math.PI/10)*4, 0],
        [0, (Math.PI/10)*5, 0],
        [0, (Math.PI/10)*6, 0],
        [0, (Math.PI/10)*7, 0],
        [0, (Math.PI/10)*8, 0],
        [0, (Math.PI/10)*9, 0],
        [0, (Math.PI/10)*10, 0],
        [0, (Math.PI/10)*11, 0],
        [0, (Math.PI/10)*12, 0],
        [0, (Math.PI/10)*13, 0],
        [0, (Math.PI/10)*14, 0],
        [0, (Math.PI/10)*15, 0],
        [0, (Math.PI/10)*16, 0],
        [0, (Math.PI/10)*17, 0],
        [0, (Math.PI/10)*18, 0],
        [0, (Math.PI/10)*19, 0],
        [0, (Math.PI/10)*20, 0],
        [0, 0, (Math.PI/10)],
        [0, 0, (Math.PI/10)*2],
        [0, 0, (Math.PI/10)*3],
        [0, 0, (Math.PI/10)*4],
        [0, 0, (Math.PI/10)*5],
        [0, 0, (Math.PI/10)*6],
        [0, 0, (Math.PI/10)*7],
        [0, 0, (Math.PI/10)*8],
        [0, 0, (Math.PI/10)*9],
        [0, 0, (Math.PI/10)*10],
        [0, 0, (Math.PI/10)*11],
        [0, 0, (Math.PI/10)*12],
        [0, 0, (Math.PI/10)*13],
        [0, 0, (Math.PI/10)*14],
        [0, 0, (Math.PI/10)*15],
        [0, 0, (Math.PI/10)*16],
        [0, 0, (Math.PI/10)*17],
        [0, 0, (Math.PI/10)*18],
        [0, 0, (Math.PI/10)*19],
        [0, 0, (Math.PI/10)*20],
    ];

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
            </Canvas>
            <div>
                <button onClick={handlePlayClick}>{isPlaying ? 'Pause' : 'Play'}</button>

                <input
                    type="range"
                    min="0"
                    max={rotationData.length - 1}
                    value={currentFrame}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    );
};

export default App;

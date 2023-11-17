import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Euler } from 'three';

const RotatingObject = ({ rotationValues }) => {
    const meshRef = useRef();

    useFrame(() => {
        const [x, y, z] = rotationValues;
        meshRef.current.rotation.set(x, y, z);
    });

    return (
        <mesh ref={meshRef}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

const App = () => {
    // Example rotation data over time
    const rotationData = [
        [0, 0, 0],
        [Math.PI / 4, Math.PI / 4, Math.PI / 4],
        [Math.PI / 2, Math.PI / 2, Math.PI / 2],
        [Math.PI, Math.PI, Math.PI],
    ];

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingObject rotationValues={rotationData[0]} />
        </Canvas>
    );
};

export default App;

import React, {useRef} from 'react';
import {useFrame} from 'react-three-fiber';

const RotatingObject = ({ rotationValues }) => {
    const groupRef = useRef();

    useFrame(() => {
        const [x, y, z] = rotationValues;
        if (groupRef.current) {
            groupRef.current.rotation.set(y, x, z);
        }
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[0.9, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 32]} attach="geometry" />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.8, -2.8, 0]} rotation={[0,0,90]}>
                <boxGeometry args={[2, 1, 0.1, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[-0.8, -2.8, 0]} rotation={[0,0,-90]}>
                <boxGeometry args={[2, 1, 0.1, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[0, -2.8, 0.8]} rotation={[-90,0,0]}>
                <boxGeometry args={[0.1, 1, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[0, -2.8, -0.8]} rotation={[90,0,0]}>
                <boxGeometry args={[0, 1, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
        </group>
    );
};

export default RotatingObject;
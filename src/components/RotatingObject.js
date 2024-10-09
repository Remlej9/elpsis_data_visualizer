import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const RotatingObject = ({ rotationValues }) => {
    const groupRef = useRef();

    useFrame(() => {
        const [x, y, z] = rotationValues;
        if (groupRef.current) {
            groupRef.current.rotation.set(y, x, z);
        }
    });

    const textTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext('2d');

        // Draw background
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Rotate the canvas context
        context.translate(canvas.width / 2.25, canvas.height * 0.7);
        context.rotate(-Math.PI / 2); // Rotate 90 degrees counterclockwise

        // Draw text
        context.fillStyle = '#000000';
        context.font = 'bold 64px Arial';
        context.textAlign = 'right';
        context.textBaseline = 'bottom';
        context.fillText('MYTIKAS', canvas.width / 2, canvas.height / 2);

        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        
        texture.needsUpdate = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1,1);
        return texture;
    }, []);

    return (
        <group ref={groupRef}>
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[0.9, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 64, 1, true]} />
                <meshStandardMaterial map={textTexture} />
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
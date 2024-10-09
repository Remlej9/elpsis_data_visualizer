import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RotatingObject = ({ rotationValues }) => {
    const groupRef = useRef();
    const [textTexture, setTextTexture] = useState(null);
    const { gl } = useThree(); // Access renderer for anisotropy

    useFrame(() => {
        const [x, y, z] = rotationValues;
        if (groupRef.current) {
            groupRef.current.rotation.set(y, x, z);
        }
    });

    useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048; // Increased canvas size
    canvas.height = 2048;
    const context = canvas.getContext('2d');

    // Draw background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = '/mutikas.png';
    image.onload = () => {
        // Draw image centered on the canvas
        context.save();
        context.drawImage(image, 500, 500, 512, 512);
        context.restore();

        // Draw text
        context.fillStyle = '#000000';
        context.font = 'bold 256px Arial'; // Adjusted font size
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.rotate(-Math.PI / 2);
        context.translate(-canvas.height, canvas.width / 2.7);
        context.fillText('MYTIKAS', canvas.width / 2, canvas.height / 2);

        // Create texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        // Improve texture filtering
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        // Apply anisotropy
        const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
        texture.anisotropy = maxAnisotropy;

        setTextTexture(texture);

        document.body.appendChild(canvas);
    };
  }, [gl]);

    return (
        <group ref={groupRef}>
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[0.9, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#349ecb" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 64, 1, true]} />
                {textTexture && <meshStandardMaterial map={textTexture} />}
            </mesh>
            <mesh position={[0, -4, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 0.1, 64, 1, false]} />
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
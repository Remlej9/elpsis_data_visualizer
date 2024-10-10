import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ElpisIIB = ({ rotationValues }) => {
    const groupRef = useRef();
    const [textTexture, setTextTexture] = useState(null);
    const [model, setModel] = useState(null);
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

            // Uncomment to see the canvas
            //document.body.appendChild(canvas);
        };
    }, [gl]);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/Elpis 2.0b.gltf', (gltf) => {
            setModel(gltf.scene);
        });

    }, []);

    return (
        <group ref={groupRef}>
            {model && <primitive object={model} />}
        </group>
    );
};

export default ElpisIIB;
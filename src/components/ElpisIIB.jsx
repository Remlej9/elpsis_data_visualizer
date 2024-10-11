import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ElpisIIB = ({ rotationValues, onLoad }) => {
    const groupRef = useRef();
    const [model, setModel] = useState(null);

    useEffect(() => {
        const [x, y, z] = rotationValues;
        if (groupRef.current) {
            groupRef.current.rotation.set(y, x, z);
        }
    }, [rotationValues]);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load('/Elpis 2.0b.gltf', (gltf) => {
            const loadedModel = gltf.scene;
            loadedModel.rotation.set(-Math.PI / 2, 0, 0); // Set initial rotation to make it upright
            setModel(loadedModel);
            onLoad();
        });

    }, [onLoad]);

    if (!model) {
        return null;
    }

    return (
        <group ref={groupRef} scale={15}>
            <primitive object={model} />
        </group>
    );
};

export default ElpisIIB;
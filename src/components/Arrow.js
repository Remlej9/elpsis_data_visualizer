import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';

const Arrow = ({ position, direction, color }) => {
    const arrowRef = useRef();

    useFrame(({ camera }) => {
        arrowRef.current.setDirection(direction.clone().applyQuaternion(camera.quaternion));
    });

    return <arrowHelper ref={arrowRef} args={[direction, new Vector3(0, 0, 0), 1, color]} />;
};

export default Arrow;
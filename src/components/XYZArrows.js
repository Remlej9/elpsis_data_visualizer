import React from 'react';
import Arrow from './Arrow';
import { Vector3 } from 'three';

const XYZArrows = () => {
    return (
        <>
            <Arrow direction={new Vector3(1, 0, 0)} color="red" />
            <Arrow direction={new Vector3(0, 1, 0)} color="green" />
            <Arrow direction={new Vector3(0, 0, 1)} color="blue" />
        </>
    );
};

export default XYZArrows;
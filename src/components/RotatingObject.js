import React, {useRef} from 'react';
import {useFrame} from 'react-three-fiber';
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
// import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

const RotatingObject = ({ rotationValues }) => {
    const groupRef = useRef();

    /*const fbx = useLoader(FBXLoader, '../object/source/FBX 2013/day_3_Punchrulle.fbx');
    const obj = useLoader(OBJLoader, '../object/source/OBJ 2013/day_3_Punchrulle.obj');
    const colorMap = useLoader(OBJLoader, '../object/source/OBJ 2013/day_3_Punchrulle.mtl');*/

    useFrame(() => {
        const [x, y, z] = rotationValues;
        groupRef.current.rotation.set(y, x, z);
    });

    return (
        <group ref={groupRef}>
            {/*obj && <primitive object={obj}
            map={colorMap}
            />*/}
            {/*fbx && <primitive object={fbx} />*/}
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[0.9, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 32]} attach="geometry" />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0.8, -2.8, 0]} rotation={[0,0,90]}>
                <boxGeometry args={[2, 1, 0.1, 32]} attach="geometry" />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[-0.8, -2.8, 0]} rotation={[0,0,-90]}>
                <boxGeometry args={[2, 1, 0.1, 32]} attach="geometry" />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[0, -2.8, 0.8]} rotation={[-90,0,0]}>
                <boxGeometry args={[0.1, 1, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="gray" />
            </mesh>
            <mesh position={[0, -2.8, -0.8]} rotation={[90,0,0]}>
                <boxGeometry args={[0, 1, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="gray" />
            </mesh>
        </group>
    );
};

export default RotatingObject;
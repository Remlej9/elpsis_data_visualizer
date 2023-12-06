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
        groupRef.current.rotation.set(x, y, z);
    });

    return (
        <group ref={groupRef}>
            {/*obj && <primitive object={obj}
            map={colorMap}
            />*/}
            {/*fbx && <primitive object={fbx} />*/}
            <mesh position={[0, 2, 0]}>
                <coneGeometry args={[1, 2, 32]} attach="geometry" />
                <meshStandardMaterial color="#aa0000" />
            </mesh>
            <mesh position={[0, -1.5, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 5, 32]} attach="geometry" />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[0, -3.9, 0]}>
                <boxGeometry args={[3, 0.1, 0.1, 32]} attach="geometry" />
                <meshStandardMaterial color="red" />
            </mesh>
            <mesh position={[0, -3.9, 0]}>
                <boxGeometry args={[0.1, 0.1, 3, 32]} attach="geometry" />
                <meshStandardMaterial color="red" />
            </mesh>
        </group>
    );
};

export default RotatingObject;
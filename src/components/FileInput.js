import React from "react";

const FileInput = () => {
    const [decodedData, setDecodedData] = React.useState("");
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryData = new Uint8Array(event.target.result);

            // Assuming each struct has a fixed size of 40 bytes (adjust according to your actual struct size)
            const structSize = 40;
            const numStructs = binaryData.length / structSize;
            const telemetryData = [];

            for (let i = 0; i < numStructs; i++) {
                const offset = i * structSize;
                const acc = {
                    x: new Float32Array(binaryData.slice(offset, offset + 4))[0],
                    y: new Float32Array(binaryData.slice(offset + 4, offset + 8))[0],
                    z: new Float32Array(binaryData.slice(offset + 8, offset + 12))[0],
                };

                const rot = {
                    R: new Float32Array(binaryData.slice(offset + 12, offset + 16))[0],
                    I: new Float32Array(binaryData.slice(offset + 16, offset + 20))[0],
                    J: new Float32Array(binaryData.slice(offset + 20, offset + 24))[0],
                    K: new Float32Array(binaryData.slice(offset + 24, offset + 28))[0],
                };

                const bnoReset = binaryData[offset + 28] !== 0;
                const bnoMissed = binaryData[offset + 29];
                const direction = new Int32Array(binaryData.slice(offset + 30, offset + 34))[0];
                const alt = new Float32Array(binaryData.slice(offset + 34, offset + 38))[0];
                const parachuteState = new Int32Array(binaryData.slice(offset + 38, offset + 42))[0];
                const temp = new Float32Array(binaryData.slice(offset + 42, offset + 46))[0];
                const pres = new Float32Array(binaryData.slice(offset + 46, offset + 50))[0];
                const basePres = new Float32Array(binaryData.slice(offset + 50, offset + 54))[0];
                const flightTime = new Int32Array(binaryData.slice(offset + 54, offset + 58))[0];
                const time = new Int32Array(binaryData.slice(offset + 58, offset + 62))[0];

                const telemetryStruct = {
                    acc,
                    rot,
                    bnoReset,
                    bnoMissed,
                    direction,
                    alt,
                    parachuteState,
                    temp,
                    pres,
                    basePres,
                    flightTime,
                    time,
                };

                telemetryData.push(telemetryStruct);
            }

            setDecodedData(JSON.stringify(telemetryData, null, 2));
            console.log(JSON.stringify(telemetryData, null, 2));
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="file-input">
                <label className={file ? "file-input-button active" : "file-input-button"}>
                    <input className="browse" type="file" onChange={handleFileChange}/>
                    <div className="file-input-text">{file ? file.name : "Load Datafile"}</div>
                </label>
            {/*<div>{decodedData}</div>*/}
        </div>
    );
};

export default FileInput;

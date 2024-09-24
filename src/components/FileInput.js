import React from "react";

const FileInput = ({ onFileRead }) => {
    const [file, setFile] = React.useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        // file has format: [x, y, z], [x, y, z], ...
        reader.onload = (event) => {
            const data = event.target.result;
            const decoder = new TextDecoder("utf-8");
            const decodedData = decoder.decode(data);
            console.log(decodedData);
            const dataArray = decodedData.split("\n").map((line) => {
                // Remove the brackets and split the line into components
                const components = line.replace(/[\[\]]/g, '').split(",");
                return components.map((value) => parseFloat(value));
            });
            console.log(dataArray)
            onFileRead(dataArray);
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

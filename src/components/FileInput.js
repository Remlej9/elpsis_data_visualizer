import React from "react";

// The datatype in the file is a bytepointer generated in C++.
// This function converts the bytepointer to a string.
// Although the string is not human readable, this
// is because the data is in binary format.
// We can make this string human readable by converting
// it to a base64 string.
const bytePointerToString = (bytePointer) => {
    let string = "";
    for (let i = 0; i < bytePointer.size(); i++) {
        string += String.fromCharCode(bytePointer.get(i));
    }
    return string;
}

const FileInput = () => {
    const [decodedData, setDecodedData] = React.useState("");

    // This function is called when a file is selected
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const string = bytePointerToString(event.target.result);
            const base64String = btoa(string);
            setDecodedData(base64String);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange}/>
            <div>{decodedData}</div>
        </div>
    )
}

export default FileInput;
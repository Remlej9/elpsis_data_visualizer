import React from 'react';
import Draggable from 'react-draggable'; // Import the Draggable component
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import accelerationdata from "../data/accelerationdata";
import '../css/GraphPopup.css';

const data = accelerationdata.map((value, index) => ({
    time: index / 10,
    acceleration: value.value
}));

const GraphPopup = ({ frame, onClose }) => {
    const slice = data.slice(0, frame + 1);

    return (
        <Draggable>
            {/* Wrap your content with Draggable component */}
            <div className="graph-popup">
                <div className="close-button" onClick={onClose}>
                    Close
                </div>
                <LineChart width={400} height={400} data={slice}>
                    <Line type="monotone" dataKey="acceleration" stroke="#8884d8" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" domain={[0, data.length]}/>
                    <YAxis domain={[0, 1]}/>
                    <Tooltip />
                </LineChart>
            </div>
        </Draggable>
    );
};

export default GraphPopup;

import React from 'react';
import Draggable from 'react-draggable'; // Import the Draggable component
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import accelerationdata from "../data/accelerationdata";
import '../css/GraphPopup.css';

const data = accelerationdata.map((value, index) => ({
    time: index / 10,
    acceleration: value.value
}));

const GraphPopup = ({ type, frame }) => {
    const slice = data.slice(0, frame + 1);

    return (
        <Draggable>
            {/* Wrap your content with Draggable component */}
            <div className="graph-popup">
                {/*
                    <div className="close-button" onClick={onClose}>
                        Close
                    </div>
                */}

                <div className="graph-title">
                    {type}
                </div>

                <LineChart width={250} height={250} data={slice}>
                    <Line type="monotone" dataKey={type} stroke="#8884d8" strokeWidth={3} />
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

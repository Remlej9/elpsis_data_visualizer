import React from 'react';
import Draggable from 'react-draggable';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import accelerationdata from "../data/accelerationdata";
import altitudedata from "../data/altitudedata";
import '../css/GraphPopup.css';

const GraphPopup = ({ type, frame }) => {
    // Use either acceleration data or altitude data depending on the type
    const data = type === 'acceleration' ? accelerationdata : altitudedata;

    const slice = data.slice(0, frame + 1).map((value, index) => ({
        time: index / 10,
        value
    }));

    return (
        <Draggable>
            <div className="graph-popup">
                <div className="graph-title">
                    {type}
                </div>

                <LineChart width={250} height={250} data={slice}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" domain={[0, slice.length]}/>
                    <YAxis domain={[0, 1]}/>
                    <Tooltip />
                </LineChart>
            </div>
        </Draggable>
    );
};

export default GraphPopup;
import React, { useState, useContext, useEffect } from 'react';
import Card from 'canvas-core-react/lib/Card';
import TextHeadline from 'canvas-core-react/lib/TextHeadline';
import TextBody from 'canvas-core-react/lib/TextBody';
import PrimaryButton from 'canvas-core-react/lib/PrimaryButton';
import myAppContext from './context';


const doAction = (action) => {
    return fetch('/api/action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
    });
};

const getPoints = async () => {
    const response = await fetch('/api/points');
    return await response.json();
};
const MyComponent = ({ title, children }) => {
    const [points, setPoints] = useState(0);
    const { userName } = useContext(myAppContext);
    const onButtonAction = () => {
        doAction('Button Pressed');
    };
    useEffect(() => {
        const { points } = getPoints();
        setPoints(points);
    });
    return (
        <Card type="floatHigh">
            <TextHeadline>{title}</TextHeadline>
            <TextBody>
                <strong>Username:</strong> {userName}
            </TextBody>
            <TextBody>
                <strong>Points:</strong> {points}
            </TextBody>
            {children}
            <PrimaryButton onClick={onButtonAction}>Action</PrimaryButton>
        </Card>
    );
};

export default MyComponent;

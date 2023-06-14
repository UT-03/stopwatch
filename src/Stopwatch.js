import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const Stopwatch = () => {
    const [time, setTime] = useState(0); // State to track the stopwatch time
    const [isRunning, setIsRunning] = useState(false); // State to track if the stopwatch is running or paused
    const [laps, setLaps] = useState([]); // State to store lap times
    const intervalRef = useRef(null); // Reference to the interval used for updating the time

    useEffect(() => {
        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const start = () => {
        if (!isRunning) {
            // Start the stopwatch by updating the time every 10 milliseconds
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
            setIsRunning(true); // Set the running state to true
        }
    };

    const pause = () => {
        // Pause the stopwatch by clearing the interval
        clearInterval(intervalRef.current);
        setIsRunning(false); // Set the running state to false
    };

    const restart = () => {
        // Restart the stopwatch by resetting the time and lap records
        clearInterval(intervalRef.current);
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    };

    const newLap = () => {
        if (isRunning) {
            // Record a new lap time while the stopwatch is running
            const formattedTime = formatTime(time);
            setLaps(prevLaps => [...prevLaps, formattedTime]);
        }
    };

    const reset = () => {
        // Reset the stopwatch by setting the time and lap records to zero
        setTime(0);
        setLaps([]);
    };

    const formatTime = time => {
        // Format the time into the "mm:ss:ms" format
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:
              ${seconds.toString().padStart(2, '0')}:
              ${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="stopwatch">
            <h6 className="display-6 text-center">{formatTime(time)}</h6>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="buttons">
                    {!isRunning ? (
                        <Button variant="success" onClick={start} className="m-2">Start</Button>
                    ) : (
                        <>
                            <Button variant="danger" onClick={pause} className="m-2">Pause</Button>
                            <Button variant="primary" onClick={newLap} className="m-2">New Lap</Button>
                        </>
                    )}
                    <Button variant="secondary" onClick={restart} className="m-2">Restart</Button>
                    <Button variant="warning" onClick={reset} className="m-2">Reset</Button>
                </div>
            </div>
            <ListGroup className="laps">
                {laps.map((lap, index) => (
                    <ListGroup.Item key={index}>{lap}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Stopwatch;

import { useEffect, useState } from "react";

const useHandlePoint = () => {
    const [points, setpoints] = useState([]);
    const [inputPoint, setInputPoint] = useState(3);
    const [button, setButton] = useState("Play");
    const [status, setStatus] = useState("let's play");
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [clickedPoints, setClickedPoints] = useState([]);
    const [nextPoint, setNextPoint] = useState(1);

    const handleCountPoint = () => {
        const newPoints = [];

        for (let i = 0; i < inputPoint; i++) {
            const positionX = Math.random() * (1000 - 50);
            const positionY = Math.random() * (540 - 50);

            newPoints.push({ point: i + 1, x: positionX, y: positionY });
        }

        setpoints(newPoints);
        setButton("Restart");
        setStatus("let's play");
        setTime(0);
        setClickedPoints([]);
        setNextPoint(1);

        if (intervalId) {
            clearInterval(intervalId);
        }

        const newIntervalId = setInterval(() => {
            setTime((prevTime) => prevTime + 0.1);
        }, 100);

        setIntervalId(newIntervalId);
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    const handleClickPoint = (point) => {
        if (point === nextPoint) {
            setClickedPoints([...clickedPoints, point]);
            setTimeout(() => {
                setpoints((prevPoints) =>
                    prevPoints.filter((item) => item.point !== point)
                );
                if (nextPoint === Number(inputPoint)) {
                    clearInterval(intervalId);
                    setStatus("All cleared");
                }
            }, 1600);

            if (nextPoint < Number(inputPoint)) {
                setNextPoint(nextPoint + 1);
            }
        } else {
            clearInterval(intervalId);
            setStatus("Game Over");
        }
    };

    return {
        status,
        inputPoint,
        setInputPoint,
        time,
        handleCountPoint,
        button,
        points,
        clickedPoints,
        handleClickPoint,
    };
};

export default useHandlePoint;

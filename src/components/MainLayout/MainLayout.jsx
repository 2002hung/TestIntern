import "./mainLayout.css";
import useHandlePoint from "./handlePoint";
const MainLayout = () => {
    const {
        status,
        inputPoint,
        setInputPoint,
        time,
        handleCountPoint,
        button,
        points,
        clickedPoints,
        handleClickPoint,
    } = useHandlePoint();

    return (
        <div className="mainLayout">
            <h1 className="heading">{status}</h1>
            <div className="point">
                <label htmlFor="">Points:</label>
                <input
                    type="number"
                    value={inputPoint}
                    onChange={(e) => setInputPoint(Number(e.target.value))}
                />
            </div>
            <div className="countDown">
                <p>Time:</p>
                <span>{time.toFixed(1)}s</span>
            </div>
            <button className="btn" onClick={handleCountPoint}>
                {button}
            </button>
            <div className="box">
                {points.map((item, index) => (
                    <span
                        key={index}
                        className={`number ${
                            clickedPoints.includes(item.point) ? "fade-out" : ""
                        }`}
                        style={{
                            left: `${item.x}px`,
                            top: `${item.y}px`,
                            zIndex: inputPoint - item.point,
                        }}
                        onClick={() => handleClickPoint(item.point)}
                    >
                        {item.point}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MainLayout;

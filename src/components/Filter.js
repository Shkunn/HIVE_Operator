
import { useEffect } from "react";

function Filter({ setActiveCategory, activeCategory, setFiltered, robotData }) {

    useEffect(() => {
        if (activeCategory === 'ALL') {
            setFiltered(robotData);
            return
        }
        const filtered = robotData.filter((robot) =>
            robot.status.includes(activeCategory)
        );
        setFiltered(filtered);

    }, [activeCategory, robotData]);

    return (
        <div className="filter-container">
            <button
                className={activeCategory === 'ALL' ? "active" : ""}
                onClick={() => setActiveCategory('ALL')}
            >
                All
            </button>
            <button
                className={activeCategory === 'DELIVERY' ? "active" : ""}
                onClick={() => setActiveCategory('DELIVERY')}
            >
                Delivery
            </button>
            <button
                className={activeCategory === 'STOP' ? "active" : ""}
                onClick={() => setActiveCategory('STOP')}
            >
                Stop
            </button>
            <button
                className={activeCategory === 'WAITING' ? "active" : ""}
                onClick={() => setActiveCategory('WAITING')}
            >
                Waiting
            </button>
            <button
                className={activeCategory === 'PROBLEM' ? "active" : ""}
                onClick={() => setActiveCategory('PROBLEM')}
            >
                Problem
            </button>
        </div >
    );
}

export default Filter;
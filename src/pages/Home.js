import { useEffect, useRef, useState } from 'react';
import RobotCards from '../components/RobotsCards'
import RobotMap from '../components/RobotMap'
import Navbar from "../components/Navbar";


function Home({socket}) {

    const [active, setActive] = useState(false);

    return (
        <>
            <Navbar />
            <div className="home">
                <div className={active ? "robot-cards active" : "robot-cards"}>
                    <div className='home-map-button'>
                        <button
                            className='home-map-button-container'
                            onClick={() => setActive(!active)}
                        >
                            {active ? 'Voir la Map' : 'Cacher la Map'}
                        </button>
                    </div>

                    <RobotCards socket={socket} />
                </div>




                <nav className={active ? 'robot-map' : 'robot-map active'}>
                    <RobotMap socket={socket} />
                </nav>
            </div>
        </>
    );
}

export default Home
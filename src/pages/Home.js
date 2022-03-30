import { useState } from 'react';
import RobotCards from '../components/RobotsCards'
import RobotMap from '../components/RobotMap'
import io from 'socket.io-client'
import Navbar from "../components/Navbar";

// const socket = io.connect('http://0.0.0.0:5000')

const socket = io.connect('https://api-devo-docker.herokuapp.com/')



function Home() {

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
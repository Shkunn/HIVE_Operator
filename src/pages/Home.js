import { useState } from 'react';
import RobotCards from '../components/RobotsCards'
import RobotMap from '../components/RobotMap'
import io from 'socket.io-client'

const socket = io.connect('http://0.0.0.0:5000')


function Home() {

    const [active, setActive] = useState(false);

    return (
        <div className="home">
            <div className={active ? "robot-cards active" : "robot-cards"}>
                <button
                    className='home-map-button'
                    onClick={() => setActive(!active)}
                >
                    {active ? 'Voir la Map' : 'Cacher la Map'}
                </button>

                <RobotCards socket={socket} />
            </div>



            <nav className={active ? 'robot-map' : 'robot-map active'}>
                <RobotMap socket={socket} />
            </nav>
        </div>
    );
}

export default Home
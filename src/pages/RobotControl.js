import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import ProgressBar from "@ramonak/react-progress-bar";
import RobotMap from '../components/RobotControlMap'
import { useGamepads } from 'react-gamepads'
import Progressbar from '../components/ProgressBar';
import NavbarControlRobot from "../components/NavBarControlRobot";


const buttonLabels = [
    "A",
    "B",
    "X",
    "Y",
    "L1",
    "R1",
    "L2",
    "R2",
    "Back",
    "Start",
    "L3",
    "R3",
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
    "XBOX",
]

const axesLabels = [
    "LX",
    "LY",
    "RX",
    "RY",
]

var timestamp = 0
var timestamp2 = 0



function RobotControl({ socket }) {


    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)

    const [modal, setModal] = useState(true)
    const [value, setValue] = useState(true)
    const [data, setData] = useState('Offline')
    const [streamActive, setStreamActive] = useState(false)

    useEffect(() => {
        socket.on('operator_data', (data) => {

            data.map((robot, index) => {
                if (robot['name'] === robotSelected.robot['name'] && robot['connection'] === 'ON') {
                    setData('Online')
                }
                if (robot['name'] === robotSelected.robot['name'] && robot['connection'] === 'OFF') {
                    setData('Offline')
                }
            })
        })
    }, [])

    const [gamepads, setGamepads] = useState([]);


    var disable = false;
    var angle = 0;


    const [streamVideo, setStreamVideo] = useState('')
    const [streamLidar, setStreamLidar] = useState('')

    useEffect(() => {

        socket.emit('operator_interface', "123")

        socket.on('streamVideo', (data) => {
            setStreamVideo(data)
            // console.log(data)
        })


        socket.on('streamLidar', (data) => {
            setStreamLidar(data)
            // console.log(data)
        })



    }, [])

    const mapStyle = {
        'OFF': '#BF4342',
        'STOP': '#D8973C',
        'DELIVERY': '#119822',
        'WAITING': '#D8C99B'
    }

    var color = '';

    const Checkbox = ({ label, value, onChange, name }) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange} name={name} style={{ marginRight: 5 }} />
                {label}
            </label>
        );
    };


    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(false);
    const [checkedThree, setCheckedThree] = useState(false);
    const [checkedFour, setCheckedFour] = useState(false);
    const [checkedFive, setCheckedFive] = useState(false);
    const handleChangeOne = (e) => {
        checkedOne ? setValue('') : setValue(e.target.name)

        setCheckedOne(!checkedOne);

        checkedTwo ? setCheckedTwo(!checkedTwo) : setCheckedTwo(checkedTwo);
        checkedThree ? setCheckedThree(!checkedThree) : setCheckedThree(checkedThree);
        checkedFour ? setCheckedFour(!checkedFour) : setCheckedFour(checkedFour);
        checkedFive ? setCheckedFive(!checkedFive) : setCheckedFive(checkedFive);
    };
    const handleChangeTwo = (e) => {
        checkedTwo ? setValue('') : setValue(e.target.name)

        setCheckedTwo(!checkedTwo);

        checkedOne ? setCheckedOne(!checkedOne) : setCheckedOne(checkedOne);
        checkedThree ? setCheckedThree(!checkedThree) : setCheckedThree(checkedThree);
        checkedFour ? setCheckedFour(!checkedFour) : setCheckedFour(checkedFour);
        checkedFive ? setCheckedFive(!checkedFive) : setCheckedFive(checkedFive);
    };
    const handleChangeThree = (e) => {
        checkedThree ? setValue('') : setValue(e.target.name)

        setCheckedThree(!checkedThree);

        checkedOne ? setCheckedOne(!checkedOne) : setCheckedOne(checkedOne);
        checkedTwo ? setCheckedTwo(!checkedTwo) : setCheckedTwo(checkedTwo);
        checkedFour ? setCheckedFour(!checkedFour) : setCheckedFour(checkedFour);
        checkedFive ? setCheckedFive(!checkedFive) : setCheckedFive(checkedFive);
    };
    const handleChangeFour = (e) => {
        checkedFour ? setValue('') : setValue(e.target.name)

        setCheckedFour(!checkedFour);

        checkedOne ? setCheckedOne(!checkedOne) : setCheckedOne(checkedOne);
        checkedTwo ? setCheckedTwo(!checkedTwo) : setCheckedTwo(checkedTwo);
        checkedThree ? setCheckedThree(!checkedThree) : setCheckedThree(checkedThree);
        checkedFive ? setCheckedFive(!checkedFive) : setCheckedFive(checkedFive);
    };
    const handleChangeFive = (e) => {
        checkedFive ? setValue('') : setValue(e.target.name)

        setCheckedFive(!checkedFive);

        checkedOne ? setCheckedOne(!checkedOne) : setCheckedOne(checkedOne);
        checkedTwo ? setCheckedTwo(!checkedTwo) : setCheckedTwo(checkedTwo);
        checkedThree ? setCheckedThree(!checkedThree) : setCheckedThree(checkedThree);
        checkedFour ? setCheckedFour(!checkedFour) : setCheckedFour(checkedFour);
    };

    useGamepads(_gamepads => {
        if (Date.now() - timestamp > 50) {

            setGamepads(Object.values(_gamepads))

            timestamp = Date.now()

        }
    })
    if (!gamepads) return '';


    var data_to_send = []


    return (

        <>
            <NavbarControlRobot data={data} socket={socket} />
            < div className="robotControl" >
                <div className="left">
                    <div className="control-div">
                        <div className="button-div">
                            {
                                modal ?
                                    <button
                                        style={{ padding: 20 }}
                                        onClick={() => {
                                            modal ? setModal(false) : setModal(false)
                                        }}
                                    >
                                        Prends le contrôle
                                        <BsIcons.BsController style={{ fontSize: 30 }} />
                                    </button>
                                    :
                                    <button
                                        style={{ padding: 20 }}
                                        onClick={() => {
                                            modal ? setModal(true) : setModal(true)
                                        }}
                                    >
                                        Envoie des commandes
                                    </button>
                            }
                        </div>

                        <div className="modalOpen">
                            {modal ?
                                <div className='send-command-div'>
                                    <div className="checkbox-div">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkedOne}
                                                onChange={handleChangeOne}
                                                name={'STOP'}
                                                style={{ marginRight: 5 }} />
                                            Stop
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkedTwo}
                                                onChange={handleChangeTwo}
                                                name={'HOME'}
                                                style={{ marginRight: 5 }} />
                                            Home
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkedThree}
                                                onChange={handleChangeThree}
                                                name={'OPEN-MODULE'}
                                                style={{ marginRight: 5 }} />
                                            Ouvre le Module
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={checkedFour}
                                                onChange={handleChangeFour}
                                                name={'CLOSE-MODULE'}
                                                style={{ marginRight: 5 }} />
                                            Ferme le Module
                                        </label>
                                        {/* <label>
                                        <input
                                            type="checkbox"
                                            checked={checkedFive}
                                            onChange={handleChangeFive}
                                            name={'SPEAK'}
                                            style={{ marginRight: 5 }} />
                                        "Parle"
                                    </label> */}
                                    </div>
                                    {
                                        checkedOne || checkedTwo || checkedThree || checkedFour || checkedFive ?
                                            disable = false
                                            :
                                            disable = true
                                    }
                                    <div className="button-send-command">
                                        <button
                                            onClick={() => {
                                                data_to_send = [robotSelected.robot['name'], value]
                                                // console.log(data_to_send)
                                                socket.emit('operator_command', data_to_send)
                                            }}
                                            disabled={disable}
                                            style={disable ? { opacity: 0.5 } : { opacity: 1 }}
                                        >
                                            Send command
                                        </button>
                                    </div>
                                </div>

                                :

                                <div className='controler-div'>
                                    <div className="title-controler">
                                        <BsIcons.BsController />
                                        <p style={{ marginLeft: 20 }}>Contrôler {robotSelected.robot['name']}</p>
                                    </div>
                                    {
                                        gamepads.length > 0 ?

                                            gamepads.map((gp, index) => {

                                                if (Date.now() - timestamp2 > 200) {

                                                    socket.emit('operator_command_controller',
                                                        ([
                                                            robotSelected.robot['name'],
                                                            gamepads[0].buttons[6].value * 100,
                                                            gamepads[0].buttons[7].value * 100,
                                                            Math.sqrt(Math.pow(gp.axes[0], 2) + Math.pow(gp.axes[1], 2)) < 0.2 ?

                                                                90

                                                                :

                                                                (gp.axes[1] < 0 ?
                                                                    ((((Math.acos(gp.axes[0] / Math.sqrt(gp.axes[1] * gp.axes[1] + gp.axes[0] * gp.axes[0])) * 180 / Math.PI) * -1 + 180)))
                                                                    :
                                                                    ((((Math.acos(gp.axes[0] / Math.sqrt(gp.axes[1] * gp.axes[1] + gp.axes[0] * gp.axes[0])) * 180 / Math.PI) + 180))))
                                                        ])
                                                    );

                                                    timestamp2 = Date.now()

                                                }


                                                return (
                                                    <div key={index} className='gamepad-data'>
                                                        <div className='gamepad-data-buttons'>
                                                            <div className='gamepad-progressBar'>
                                                                {buttonLabels[6]}:
                                                                {
                                                                    <Progressbar progress={gp.buttons[6].value * 100} height={50} />
                                                                }
                                                                {buttonLabels[7]}:
                                                                {
                                                                    <Progressbar bgcolor="white" progress={gp.buttons[7].value * 100} height={50} />
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className='gamepad-data-axes'>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <div className='gamepad-circle'>
                                                                    <div className="radius-vertical"></div>
                                                                    <div className="radius-horizontal"></div>
                                                                    <div className="rotate-bar" style={{ transform: 'rotate(' + (gp.axes[1] < 0 ? ((((Math.acos(gp.axes[0] / Math.sqrt(gp.axes[1] * gp.axes[1] + gp.axes[0] * gp.axes[0])) * 180 / Math.PI) * -1 + 180) + 270) % 360) : ((((Math.acos(gp.axes[0] / Math.sqrt(gp.axes[1] * gp.axes[1] + gp.axes[0] * gp.axes[0])) * 180 / Math.PI) + 180) + 270) % 360)) + 'deg)' }}></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })

                                            :

                                            <div className="no-controler">
                                                <div className='no-controler-container'>
                                                    Pas de manette connectée
                                                </div>
                                            </div>
                                    }
                                </div>
                            }
                        </div>

                    </div>
                    <div className="info-div">
                        <div className="title">
                            <h3>Data concernant {robotSelected.robot['name']}</h3>
                        </div>

                        <div className="robot-control-data">

                            <div className="action-data">
                                <p>Action :</p>
                                <div className="action-data-status">
                                    {Object.keys(mapStyle).map((state, index) => {
                                        if (robotSelected.robot['status'] === state) {
                                            color = mapStyle[state]
                                        }
                                    })}
                                    <p style={{ color: color }} > {robotSelected.robot['status']} </p>
                                </div>
                            </div>

                            <div className="battery-data">
                                <p>Batterie</p>
                                <div className="progressBar-div">
                                    <ProgressBar
                                        completed={80}
                                        bgColor="green"
                                        height='15px'
                                        labelSize='10px'
                                    />
                                </div>
                            </div>

                            <div className="livraison-data">
                                <p>Livraison</p>
                                <div className="progressBar-div">
                                    <ProgressBar
                                        completed={80}
                                        bgColor="#c4151c"
                                        height='15px'
                                        labelSize='10px'
                                    />
                                </div>
                            </div>

                            <div className="module-data">
                                <p>Module :</p>
                                <div className="module-data-status">
                                    <p> Fermé </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="middle">
                    <div className="stream-div">
                        {data === 'Online' ?

                            streamActive ?
                                <>
                                    <img src={streamVideo} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />

                                    <div className="stream-button-on">
                                        <button
                                            style={{ padding: 20 }}
                                            onClick={() => {
                                                setStreamActive(false)
                                                socket.emit('stream_active', [robotSelected.robot['name'], 'FALSE'])
                                            }}
                                        >
                                            Couper le stream
                                        </button>
                                    </div>
                                </>

                                :

                                <div className="stream-button-off">
                                    <button
                                        style={{ padding: 20 }}
                                        onClick={() => {
                                            setStreamActive(true)
                                            socket.emit('stream_active', [robotSelected.robot['name'], 'TRUE'])
                                        }}
                                    >
                                        Lancer le stream de {robotSelected.robot['name']}
                                    </button>
                                </div>

                            :

                            <div className="stream-robot-notconnected">
                                <span style={{ fontSize: 30 }}>
                                    {robotSelected.robot['name']} est déconnecté.
                                </span>
                                <span style={{ fontSize: 15, marginTop: 20 }}>
                                    Impossible de voir son stream pour le moment...
                                </span>
                            </div>

                        }
                    </div>

                    <div className="stream-div-lidar">
                        {data === 'Online' ?

                            streamActive ?
                                <>
                                    <img src={streamLidar} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />

                                </>

                                :

                                <div className="stream-button-off">
                                    <button
                                        style={{ padding: 20 }}
                                        onClick={() => {
                                            setStreamActive(true)
                                            socket.emit('stream_active', [robotSelected.robot['name'], 'TRUE'])
                                        }}
                                    >
                                        Lancer le stream de {robotSelected.robot['name']}
                                    </button>
                                </div>

                            :

                            <div className="stream-robot-notconnected">
                                <span style={{ fontSize: 30 }}>
                                    {robotSelected.robot['name']} est déconnecté.
                                </span>
                                <span style={{ fontSize: 15, marginTop: 20 }}>
                                    Impossible de voir son stream pour le moment...
                                </span>
                            </div>

                        }
                    </div>
                </div>

                <div className="right">
                    <div className="capteur-div">
                        <p>
                            Capteur
                        </p>
                    </div>
                    <div className="map-div">
                        <RobotMap robot={robotSelected.robot} />
                    </div>
                </div>
            </div >
        </>

    )
}

export default RobotControl
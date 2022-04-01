import React, { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as BiIcons from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import { useSelector } from 'react-redux'



function Navbar({ data, socket }) {

    const [sidebar, setSidebar] = useState(false);
    // const [data, setData] = useState('Offline')

    const showSidebar = () => setSidebar(!sidebar);

    const robotOnSelected = useSelector((state) => state.robotOnReducer.selectedRobotOn.robotOn)
    const robotProblemSelected = useSelector((state) => state.robotProblemReducer.selectedRobotProblem.robotProblem)
    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)

    // useEffect(() => {
    //     socket.on('operator_data', (data) => {

    //         data.map((robot, index) => {
    //             if (robot['name'] === robotSelected.robot['name'] && robot['connection'] === 'ON') {
    //                 setData('Online')
    //             }
    //             if (robot['name'] === robotSelected.robot['name'] && robot['connection'] === 'OFF') {
    //                 setData('Offline')
    //             }
    //         })
    //         // selectRobotOn(count)
    //         // count = 0;
    //     })
    // }, [])

    socket.emit('stream_active', [robotSelected.robot['name'], 'TRUE'])


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <div className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </div>

                    <p className="robotName">{robotSelected.robot['name']}</p>

                    <div className="navbar_data-robotControl">

                        <div className="navbar-status-robotControl">
                            <p>Status</p>
                            <div className="pStatus-robotControl">
                                <p style={data === 'Online' ? { color: 'green' } : { color: 'red' }}>{data}</p>
                            </div>
                        </div>

                        <div className="navbar-distance-robotControl">
                            <p>Distance</p>
                            <div className="pDistance-robotControl">
                                <p>12km</p>
                            </div>
                        </div>

                        <div className="navbar-latency-robotControl">
                            <p>Latency</p>
                            <div className="pLatency-robotControl">
                                <p>50ms</p>
                            </div>
                        </div>

                        <div className="navbar-data-alert-robotControl">
                            <div className="icon-alert-robotControl">
                                <FiIcons.FiAlertTriangle style={{ color: 'red' }} />
                            </div>
                            <div className="pAlert-robotControl">
                                <p>{robotProblemSelected.robotProblem ? robotProblemSelected.robotProblem : 0}</p>
                            </div>
                        </div>

                        <div className="navbar-bell-robotControl">
                            <div className="icon-bell-robotControl">
                                <BiIcons.BiBell style={{ color: 'white' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <div className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </div>
                        </li>

                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path} onClick={socket.emit('stream_active', [robotSelected.robot['name'], 'FALSE'])}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}

                    </ul>
                </nav>
            </IconContext.Provider >
        </>
    )
}

export default Navbar
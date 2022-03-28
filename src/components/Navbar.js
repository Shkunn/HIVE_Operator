import React, { useState } from 'react'
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



function Navbar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const robotOnSelected = useSelector((state) => state.robotOnReducer.selectedRobotOn.robotOn)
    const robotProblemSelected = useSelector((state) => state.robotProblemReducer.selectedRobotProblem.robotProblem)
    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)

    return (
        <>
            {window.location.pathname !== '/HIVE_Operator/robotControl' ?
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className="navbar">
                        <div className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </div>
                        <div className="navbar_data">
                            <div className="navbar-data-alert">
                                <div className="icon-alert">
                                    <FiIcons.FiAlertTriangle style={{ color: 'red' }} />
                                    <p>Alerte</p>
                                </div>
                                <div className="pAlert">
                                    <p>{robotProblemSelected.robotProblem ? robotProblemSelected.robotProblem : 0}</p>
                                </div>
                            </div>

                            <div className="navbar-data-robot">
                                <div className="icon-robot">
                                    <AiIcons.AiOutlineRobot style={{ color: 'green' }} />
                                    <p>Robots</p>
                                </div>
                                <div className="pRobot">
                                    <p>{robotOnSelected.robotOn ? robotOnSelected.robotOn : 0}</p>
                                </div>
                            </div>

                            <div className="navbar-data-km">
                                <div className="icon-km">
                                    <RiIcons.RiPinDistanceLine />
                                    <p>Kilomètres</p>
                                </div>
                                <div className="pKm">
                                    <p>5</p>
                                </div>
                            </div>

                            <div className="navbar-data-command">
                                <div className="icon-command">
                                    <MdIcons.MdOutlineDeliveryDining />
                                    <p>Commandes</p>
                                </div>
                                <div className="pCommand">
                                    <p>5</p>
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
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </nav>
                </IconContext.Provider >

                :

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
                                    <p style={{color: 'green'}}>Online</p>
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
                                {/* {robotProblemSelected.robotProblem === 0 ? null :
                                    <div className="pBell-robotControl">
                                        <p>{robotProblemSelected.robotProblem ? robotProblemSelected.robotProblem : 0}</p>
                                    </div>
                                } */}
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
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </nav>
                </IconContext.Provider >
            }

        </>
    )
}

export default Navbar
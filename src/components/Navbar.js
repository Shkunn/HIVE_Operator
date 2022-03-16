import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as SiIcons from 'react-icons/si'
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

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className="navbar_data">
                        <div className="navbar-data-alert">
                            <div className="icon-alert">
                                <FiIcons.FiAlertTriangle style={{ color: 'red' }} />
                                <p>Alerte</p>
                            </div>
                            <div className="pAlert">
                                <p>{robotProblemSelected.robotProblem ? robotProblemSelected.robotProblem : 0 }</p>
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
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
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
        </>
    )
}

export default Navbar
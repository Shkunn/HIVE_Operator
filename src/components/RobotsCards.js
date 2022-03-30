import React, { useEffect, useState } from 'react'
import RobotData from './RobotData'
import Filter from './Filter'
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch } from 'react-redux';

function RobotsCards({ socket }) {

    // FILTER Value : 
    // 0 : Display every robot
    // 1 : Display Delivery Robot
    // 2 : Display Stop Robot
    // 3 : Display Waiting Robot
    // 4 : Display Problem Robot

    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState('ALL');

    const [robotData, setRobotData] = useState([]);

    const dispatch = useDispatch();
    const selectRobotOn = (robotOn) =>
        dispatch({
            type: 'ADD_ROBOT_ON',
            payload: {
                robotOn
            }
        });

    useEffect(() => {
        socket.emit('operator_interface', "123")
    }, [])

    var count = 0;

    useEffect(() => {
        socket.on('operator_data', (data) => {
            setRobotData(data);
            // console.log(data)

            data.map((robot, index) => {
                if (robot['connection'] === 'ON') {
                    count += 1
                } else {
                    return null
                }
            })
            selectRobotOn(count)
            count = 0;
        })
    }, [])





    return (
        <div className="robot-cards-content">
            <Filter
                robotData={robotData}
                setFiltered={setFiltered}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <motion.div layout className="motion-robot">
                <AnimatePresence>
                    {filtered.map((robot, index) => {
                        return <RobotData key={index} robot={robot} socket={socket} />
                    })}
                </AnimatePresence>
            </motion.div>
        </div >
    )
}

export default RobotsCards
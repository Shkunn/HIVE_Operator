import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function RobotData({ robot, socket }) {

    const [thisRobot, setThisRobot] = useState({});
    var disable = true;

    // const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)
    const dispatch = useDispatch();
    const selectRobot = (robot) =>
        dispatch({
            type: 'ADD_ROBOT',
            payload: {
                robot
            }
        });

    const selectRobotOn = (robotProblem) =>
        dispatch({
            type: 'ADD_ROBOT_PROBLEM',
            payload: {
                robotProblem
            }
        });

    var active = false;
    var color = '';
    var status = 'STOP';
    var count = 0;

    const mapStyle = {
        'OFF': '#BF4342',
        'STOP': '#D8973C',
        'DELIVERY': '#119822',
        'WAITING': '#D8C99B'
    }

    useEffect(() => {

        socket.on('MESSAGE_operator', (data) => {

            Object.keys(data).map((obj, index) => {
                if (robot['name'] === obj) {
                    setThisRobot(data[obj])
                }
            })

            Object.values(data).map((obj, index) => {
                if (obj['status'] === 'PROBLEM') {
                    count += 1
                } else {
                    return null
                }
            })
            selectRobotOn(count)
            count = 0

        })

    }, [])


    Object.keys(mapStyle).map((state, index) => {
        if (robot['status'] === 'STOP' && robot['connection'] === 'OFF') {
            color = mapStyle['OFF']
            active = false
        }
        else if (robot['status'] === state) {
            color = mapStyle[state]
            active = true
        }
    })


    return (

        < motion.div
            layout
            animate={{ opacity: 1 }
            }
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
        >
            {
                // console.log(thisRobot['name'])
                Object.keys(robot).map((obj, index) => {
                    if (robot['name'] === thisRobot['name']) {
                        // setThisRobot(data[obj])
                        status = robot['status']
                    }
                })
            }

            {
                status !== 'STOP' ?
                    disable = false
                    :
                    disable = true

                // console.log(status)
            }

            <button
                onClick={() => selectRobot(thisRobot)}
                className="robot-card"
                style={{ backgroundColor: color }}
                disabled={disable}
            >
                <h2>
                    {robot['name']}
                </h2>

                {
                    active ?
                        <div className="active-robot-card">

                            <h3>
                                Mode : {thisRobot['status']}
                            </h3>
                            <h3>
                                Batterie : {thisRobot['batterie']}
                            </h3>

                        </div>

                        :

                        null
                }
            </button>
        </motion.div >
    );
}

export default RobotData;
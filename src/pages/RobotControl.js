import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function RobotControl() {


    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)
    const dispatch = useDispatch();
    const selectRobot = (robot) =>
        dispatch({
            type: 'ADD_ROBOT',
            payload: {
                robot
            }
        });

    const navigate = useNavigate();
    const clickHandler = (e) => (
        navigate("/"),
        selectRobot('')
    )


    return (
        <div className="robotControl">
            <h1>Robot Control - {robotSelected.robot['name']}</h1>
            <button onClick={clickHandler}>HEY</button>
        </div>
    )
}

export default RobotControl
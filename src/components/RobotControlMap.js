import React, { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api"
import RobotMap from './MapRobotControl'

function RobotControlMap({ robot }) {

    const [ libraries ] = useState(['places']);


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>;


    return (
        <RobotMap robot={robot} />
    )
}

export default RobotControlMap
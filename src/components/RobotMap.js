import React, { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api"
import Map from './Map'

function RobotMap({socket}) {

    const [ libraries ] = useState(['places']);



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries,
    })

    if (!isLoaded) return <div>Loading...</div>;


    return (
        <Map socket={socket} />
    )
}

export default RobotMap
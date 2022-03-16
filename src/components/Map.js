import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    MarkerClusterer,
    InfoWindow
} from "@react-google-maps/api";
import MapStyle from '../mapStyle'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'


export default function Map({ socket }) {

    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)
    const dispatch = useDispatch();
    const selectRobot = (robot) =>
        dispatch({
            type: 'ADD_ROBOT',
            payload: {
                robot
            }
        });



    const mapRef = useRef()
    const center = useMemo(() => ({ lat: 48.9, lng: 2.15 }), []);
    const options = useMemo(
        () => ({

            // You can choose your map style with either mapId (created on the GoogleApi website) or with styles with uses a json file (this one was found on snazzymaps )
            // mapId: "3ce9c81e34d39f08",
            styles: MapStyle,
            disableDefaultUI: true,
            clickableIcons: false
        }),
        []
    );
    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const [robots, setRobots] = useState({});


    useEffect(() => {

        socket.on('MESSAGE_operator', (data) => {

            // setRobots(data)

            setRobots(Object.values(data))

        })

    }, [])

    return (
        <div className="map">
            <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="map-container"
                options={options}
                onLoad={onLoad}
            >

                {
                    robots.length > 0 ?
                        (
                            <>
                                <MarkerClusterer>
                                    {(clusterer) =>
                                        robots.map((ob, id) => (
                                            <Marker
                                                key={id}
                                                position={ob['position']}
                                                clusterer={clusterer}
                                                onClick={() => {
                                                    console.log(robotSelected)
                                                }}
                                            />
                                        ))
                                    }
                                </MarkerClusterer>

                            </>
                        )

                        :

                        null
                }

                {robotSelected.robot !== undefined && robotSelected.robot !== '' && (
                    <InfoWindow
                        position={robotSelected.robot['position']}
                        onCloseClick={() => selectRobot('')}
                    >
                        <div className="infoWindow-data">
                            <h2>{robotSelected?.robot['name']}</h2>
                            <div className="infodata-container">
                                <p>Data to show</p>
                                <p>Data to show</p>
                            </div>
                            <div className="infodata-buttons">
                                <button
                                    style={{ marginRight: 5 }}
                                >
                                    Rentrer
                                </button>
                                <div className="link-robot-control">
                                    <Link
                                        to='/robotControl'
                                    >
                                        Contrôler
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </InfoWindow>
                )}

            </GoogleMap>
        </div >
    )
}
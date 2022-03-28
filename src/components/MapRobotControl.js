import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    Marker,
    MarkerClusterer,
    InfoWindow,
    DirectionsRenderer
} from "@react-google-maps/api";
import MapStyle from '../mapStyle'
import { useDispatch, useSelector } from "react-redux";


export default function Map({ robot }) {

    const google = window.google
    const robotSelected = useSelector((state) => state.robotReducer.selectedRobot.robot)
    const [direction, setDirection] = useState()
    const destination = ({ lat: 48.89067972797846, lng: 2.153370202975856 })

    const fetchDirection = (robot) => {
        const service = new google.maps.DirectionsService();
        service.route(
            {
                origin: robot.position,
                destination: destination,
                travelMode: google.maps.TravelMode.WALKING
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    setDirection(result)
                }
            }
        )
    }
    const mapRef = useRef()
    const center = useMemo(() => (robot.position), []);
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


    return (
        <div className="map-robot-control">
            <GoogleMap
                zoom={16}
                center={center}
                mapContainerClassName="map-container-robot-control"
                options={options}
                onLoad={onLoad}
            >
                <Marker
                    position={robot.position}
                />

                // CHANGE THIS TO GET DIRECTION
                {/* {destination ? fetchDirection(robot) : null} */}

                {direction && <DirectionsRenderer directions={direction} />

                }
            </GoogleMap>
        </div >
    )
}
import React from "react"
import {useMapboxRoute} from "./hooks/useMapboxRoute"


export const JSTrip = ({originCoords}) => {

    const tripData = useMapboxRoute({
        origin: `${originCoords.longitude},${originCoords.latitude}`,
        destination: "144.972838,-37.810903",
        accessToken: process.env.REACT_APP_MAPBOX_DIRECTIONS_API_ACCESS_TOKEN
    })

    console.log(process.env)


    return <> </>
    
}
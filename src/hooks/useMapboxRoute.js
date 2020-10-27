import {useState, useEffect} from "react"

export const useMapboxRoute = ({origin, destination, accessToken}) => {
    
    const [tripData, setTripData] = useState()

    useEffect(() => {
        fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&overview=simplified&access_token=${accessToken}`
        )
        .then(res => res.json())
        .then(data => console.log(data))
    })
    
    return tripData
}
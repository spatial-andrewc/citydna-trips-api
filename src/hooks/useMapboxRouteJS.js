import { useState, useEffect } from "react";
import {calculateTrip} from "../functions/calculateTrip"

export const useMapboxRouteJS = ({ origin, destination, accessToken }) => {
  const [tripData, setTripData] = useState();

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&overview=simplified&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => setTripData(calculateTrip(data.routes[0].geometry)));
  }, [origin, destination, accessToken]);

  return tripData;
};

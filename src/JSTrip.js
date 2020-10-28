import React from "react";
import { useMapboxRouteJS } from "./hooks/useMapboxRouteJS";
import { calculateTrip } from "./functions/calculateTrip";
import { Trip } from "./Trip";

export const JSTrip = ({ originCoords, toggleTrip }) => {
  // make a call to useMapboxRouteJS to access Trip data
  const tripData = useMapboxRouteJS({
    origin: `${originCoords.longitude},${originCoords.latitude}`,
    destination: "144.972838,-37.810903",
    accessToken: process.env.REACT_APP_MAPBOX_DIRECTIONS_TOKEN,
  });

  return <>{tripData && <Trip data={tripData} toggleTrip={toggleTrip} />}</>;
};

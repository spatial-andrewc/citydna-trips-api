import React from "react";
import { useMapboxRoutePy } from "./hooks/useMapboxRoutePy";
import { Trip } from "./Trip";

export const PYTrip = ({ originCoords, toggleTrip }) => {
  // make a call to useMapboxRoutePy hook to access Trip data
  const tripData = useMapboxRoutePy({
    origin: `${originCoords.longitude},${originCoords.latitude}`,
    destination: "144.972838,-37.810903",
    accessToken: process.env.REACT_APP_MAPBOX_DIRECTIONS_TOKEN,
  });

  return <>
  {tripData && <Trip data={tripData} toggleTrip={toggleTrip} />}
  </>;
};
import React, { useState } from "react";
import {
  Box,
  Button,
} from "@material-ui/core";
import { useViewport } from "@citydna/maps";
import { JSTrip } from "./JSTrip";
import {PYTrip} from "./PYTrip"

/* 
  Render a waypoint icon at the centre of the map and provide
  toggle functionality to run trips from waypoint location to
  CWB
 */
export const ToggleTrip = () => {
  const [tripStatus, setTripStatus] = useState(false);
  const [originCoords, setOriginCoords] = useState(undefined);
  const { viewport } = useViewport();

  /* 
    Sets originCoords from waypoint icon location and tripStatus
  */
  const handleClick = () => {
    setOriginCoords({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    });
    setTripStatus(true);
  };


  const buttonText = tripStatus ? "Running trip..." : "Run Trip"

  return (
    <>
      <Box position="absolute" left={40} top={40} zIndex={1301}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          disabled={tripStatus ? true : false}
        >
          {buttonText}
        </Button>
      </Box>
      {/* 
        PYTrip will only run with the api active on the development server
      */}
      {/* {tripStatus && <PYTrip originCoords={originCoords} toggleTrip={setTripStatus} />} */}
      {tripStatus && <JSTrip originCoords={originCoords} toggleTrip={setTripStatus} />}
    </>
  );
};

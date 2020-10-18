import React, { useState } from "react";
import {
  Box,
  Button,
} from "@material-ui/core";
import { useViewport } from "@citydna/maps";
import { Trip } from "./Trip";

export const ToggleTrip = () => {
  const [tripStatus, setTripStatus] = useState(false);
  const [originCoords, setOriginCoords] = useState(undefined);

  const handleClick = () => {
    setOriginCoords({
      latitude: viewport.latitude,
      longitude: viewport.longitude,
    });
    setTripStatus(true);
  };

  const { viewport } = useViewport();

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
      {tripStatus && <Trip setTripStatus={setTripStatus} originCoords={originCoords} />}
    </>
  );
};

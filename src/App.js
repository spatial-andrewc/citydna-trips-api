import React, { useEffect, useState } from "react";
import { Theme } from "@citydna/common";
import {
  DeckGLMapboxMap,
  useUpdateViewport,
  MELBOURNE_VIEWPORT,
} from "@citydna/maps";
import { Box } from "@material-ui/core";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { ToggleTrip } from "./ToggleTrip";

function App() {
  const { setViewport } = useUpdateViewport();
  useEffect(() => {
    setViewport(MELBOURNE_VIEWPORT);
  }, [setViewport]);


  return (
    <Theme>
      <Box
        position="absolute"
        width={40}
        height={40}
        left={window.innerWidth / 2.05}
        top={window.innerHeight / 2.13}
        zIndex={1301}
      >
        <PinDropIcon />
      </Box>
      <ToggleTrip />
      <DeckGLMapboxMap
        width="100%"
        height="100vh"
      />
    </Theme>
  );
}

export default App;

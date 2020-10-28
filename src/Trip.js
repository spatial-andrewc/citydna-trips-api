import React, { useEffect, useRef } from "react";
import { TripsLayer } from "@deck.gl/geo-layers";
import { useDeckGL } from "@citydna/maps";

/* 
  accept Trip object returned from a call to either useMapboxRouteJS
  or useMapboxRoutePy and render a Deck GL Trip animation 3 times on
  the basemap.
*/
export const Trip = ({ data, toggleTrip }) => {
  const [, setLayers] = useDeckGL();
  const requestRef = useRef();

  useEffect(() => {
    // set variables to be used during animate function
    const TRIPS_LOOP = data.max_timestamp * 2;
    let currentTime = 0;
    let loopCount = 0;
    /*
      setLayers and call animation frame, changing value of
      currentTime and tripsLoop as the Trip animation progresses
    */
    const animate = () => {
      setLayers([
        new TripsLayer({
          id: "cwb-trips",
          data: data.trip,
          getPath: (d) => d.stops,
          getTimestamps: (d) => d.timestamps,
          getColor: [227, 4, 80],
          widthMinPixels: 5,
          rounded: true,
          trailLength: TRIPS_LOOP,
          currentTime,
        }),
      ]);
      if (loopCount < 3) {
        if (currentTime === TRIPS_LOOP) {
          currentTime = 0;
          loopCount++;
        } else {
          currentTime++;
        }
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // return functionality back to trip toggle button if tripsLoop has exceeded
        toggleTrip(false);
      }
    };
    animate();
    return () => cancelAnimationFrame(requestRef.current);
  }, [setLayers]);

  return <> </>;
};

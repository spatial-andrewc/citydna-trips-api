import React, { useEffect, useState, useRef } from "react";
import { TripsLayer } from "@deck.gl/geo-layers";
import { useDeckGL } from "@citydna/maps";

/* 
  Accept coordinates from incoming waypoint request and make
  a call to custom Mapbox Routing API (Flask) to render DeckGL
  Trips animation on basemap.
*/

export const Trip = ({ originCoords, setTripStatus }) => {
  const [, setLayers] = useDeckGL();
  const [trips, setTrips] = useState(null);
  const requestRef = useRef();

/*   
  call Flask endpoint and return Trips object
  set trips state variable to the returned Trips
  object 
*/
  useEffect(() => {
    const origin = `${originCoords.longitude},${originCoords.latitude}`;
    const destination = "144.972838,-37.810903";
    const M_PER_SECOND = 40;
    fetch(
      `/trips/origin/${origin}/destination/${destination}/m_per_second/${M_PER_SECOND}`
    )
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, []);

  /* 
    API returns the following object:
      {
        trip: [stops: [...], timestamps: [....]],
        max_timestamp: ${int}
      }
  */

/*   
  Request animation frame and render DeckGL Trips
  layer.
*/
  useEffect(() => {
    /* TRIPS_LOOP is the max timestamp of the returned route */
    const TRIPS_LOOP = trips && trips.max_timestamp;
    let currentTime = 0;
    /* loopCount sets the amount of times the route will animate */
    let loopCount = 0;
    const animate = () => {
      setLayers([
        new TripsLayer({
          id: "trips-layer",
          data: trips.trip,
          getPath: (d) => d.stops,
          getTimestamps: (d) => d.timestamps,
          getColor: [227, 4, 80],
          widthMinPixels: 5,
          beforeId: "road-label-large",
          rounded: true,
          trailLength: TRIPS_LOOP,
          currentTime,
        }),
      ]);
      /* if loopCount is not exceded */
      if (loopCount < 3) {
        if (currentTime === TRIPS_LOOP * 2) {
          /* reset currentTime and increment loopCount */
          currentTime = 0;
          loopCount++;
        } else {
          /* increment currentTime */
          currentTime++;
        }
        requestRef.current = requestAnimationFrame(animate);
      }
      else {
        /* 
          LoopCount is reached and provide control back to
          ToggleTrip.js
        */
        setTripStatus(false)
      }
    };
    trips && animate();
    return () => requestRef.current && cancelAnimationFrame(animate);
  }, [trips, setLayers]);

  return <></>;
};

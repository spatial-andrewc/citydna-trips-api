import React, { useEffect, useState, useRef } from "react";
import { TripsLayer } from "@deck.gl/geo-layers";
import { useDeckGL } from "@citydna/maps";

export const Trip = ({ originCoords, setTripStatus }) => {
  const [, setLayers] = useDeckGL();
  const [trips, setTrips] = useState(null);

  const requestRef = useRef();

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

  useEffect(() => {
    const TRIPS_LOOP = trips && trips.max_timestamp;
    let currentTime = 0;
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
      if (loopCount < 3) {
        if (currentTime === TRIPS_LOOP * 2) {
          currentTime = 0;
          loopCount++;
        } else {
          currentTime++;
        }
        requestRef.current = requestAnimationFrame(animate);
      }
      else {
        setTripStatus(false)
      }
    };
    trips && animate();
    return () => requestRef.current && cancelAnimationFrame(animate);
  }, [trips, setLayers]);

  return <></>;
};

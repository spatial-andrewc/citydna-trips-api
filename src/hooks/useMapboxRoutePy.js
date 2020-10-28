import {useEffect, useState} from "react"

export const useMapboxRoutePy = ({origin, destination, accessToken}) => {
    const [tripData, setTripData] = useState()

    useEffect(() => {
        const M_PER_SECOND = 40;
        fetch(
          `/trips/origin/${origin}/destination/${destination}/m_per_second/${M_PER_SECOND}/access_token/${accessToken}`
        )
          .then((res) => res.json())
          .then((data) => setTripData(data));
      }, [origin, destination, accessToken]);

      return tripData
}
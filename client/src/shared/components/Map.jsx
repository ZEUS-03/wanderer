import React, { useRef, useEffect } from "react";
import { rapid_api } from "../constant";

const Map = (props) => {
  const mapContainer = useRef(null);
  const { center } = props;

  useEffect(() => {
    const map = L.map(mapContainer.current).setView(
      [center.lat, center.lng],
      12
    );

    L.tileLayer(rapid_api, {
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([center.lat, center.lng]).addTo(map);
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Map;

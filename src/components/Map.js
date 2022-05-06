import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";

const Map = ({ startPoint, endPoint, setDistance, setSummary, setTime }) => {
 const [text, setText] = useState("");

 return (
  <>
   <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={true}>
    <TileLayer
     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <RoutingMachine
     ax={startPoint.lat}
     ay={startPoint.lng}
     bx={endPoint.lat}
     by={endPoint.lng}
     setDistance={setDistance}
     setSummary={setSummary}
     setTime={setTime}
     setText={setText}
    />
   </MapContainer>
  </>
 );
};

export default Map;

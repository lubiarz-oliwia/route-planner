import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import RouteContext from "./store/context";
import SearchPage from "./pages/SearchPage";
import MapPage from "./pages/MapPage";

function App() {
 const [routePoints, setRoutePoints] = useState({
  start: "start",
  startPointposition: { lat: "", lng: "" },
  end: "end",
  endPointposition: { lat: "", lng: "" },
 });

 const [savedRoutes, setSavedRoutes] = useState([]);

 const value = { routePoints, setRoutePoints, savedRoutes, setSavedRoutes };

 return (
  <RouteContext.Provider value={value}>
   <BrowserRouter>
    <Routes>
     <Route path="/route-plan" element={<MapPage />} />
     <Route path="/" element={<SearchPage />} />
    </Routes>
   </BrowserRouter>
  </RouteContext.Provider>
 );
}

export default App;

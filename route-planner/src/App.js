import Map from "./components/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchTool from "./components/SearchTool";
import PlacesAutocomplete from "./components/SearchTool";
import React, { useContext, useState } from "react";
import LanguageContext from "./store/context";
import SearchPage from "./pages/SearchPage";
import MapPage from "./pages/MapPage";

function App() {
 const [routePoints, setRoutePoints] = useState({
  start: "start",
  startPointposition: { lat: "", lng: "" },
  end: "end",
  endPointposition: { lat: '', lng: '' }
 });
 const [savedRoutes, setSavedRoutes] = useState([])

 const value = { routePoints, setRoutePoints, savedRoutes, setSavedRoutes };

 return (
  <LanguageContext.Provider value={value}>
   <BrowserRouter>
    <Routes>
     <Route path="/route-plan" element={<MapPage />} />
     <Route path="/" element={<SearchPage />} />
    </Routes>
   </BrowserRouter>
  </LanguageContext.Provider>
 );
}

export default App;

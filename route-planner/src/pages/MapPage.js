import { Grid } from "@mui/material";
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import RouteCalculator from "../components/RouteCalculator";
import LanguageContext from "../store/context";

function MapPage() {
 let navigate = useNavigate();
 const location = useLocation();
 const { start, end, startPointposition, endPointposition } = location.state;

 let pointe = useContext(LanguageContext);
 const [distance, setDistance] = useState(0);
const [summary, setSummary] = useState({})
 const handleRouteSave = () => {
  pointe.setSavedRoutes((prevState) => [
   ...prevState,
   {
    startPointposition,
    endPointposition,
    start,
    end,
    distance,
    summary
   },
  ]);
  navigate("/");
 };

 return (
  <Grid container gap={4}>
   <Grid item xs={7} sx={{pl: 5}}>
    <h1>Your route</h1>
    <Map
     startPoint={startPointposition}
     endPoint={endPointposition}
     setDistance={setDistance}
     setSummary={setSummary}
    />
   </Grid>
   <Grid item xs={4}>
    <h1>Route calculation</h1>
    <RouteCalculator distance={distance} onSaveRoute={handleRouteSave} />
   </Grid>
  </Grid>
 );
}

export default MapPage;

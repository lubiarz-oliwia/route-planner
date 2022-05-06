import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Map from "../components/Map";
import RouteCalculator from "../components/RouteCalculator";
import RouteContext from "../store/context";

function MapPage() {
 let navigate = useNavigate();
 const location = useLocation();
 const { start, end, startPointposition, endPointposition } = location.state;

 let contextData = useContext(RouteContext);
 const [distance, setDistance] = useState(0);
 const [time, setTime] = useState(0);

 const [summary, setSummary] = useState({});
 const handleRouteSave = () => {
  contextData.setSavedRoutes((prevState) => [
   ...prevState,
   {
    startPointposition,
    endPointposition,
    start,
    end,
    distance,
    time,
    summary,
   },
  ]);
  navigate("/");
 };

 return (
  <Grid container gap={4} sx={{ p: 5 }}>
   <Grid item xs={7}>
    <h1>Your route</h1>
    <Map
     startPoint={startPointposition}
     endPoint={endPointposition}
     setDistance={setDistance}
     setSummary={setSummary}
     setTime={setTime}
    />
   </Grid>
   <Grid item xs={4}>
    <h1>Route calculation</h1>
    <RouteCalculator
     distance={distance}
     onSaveRoute={handleRouteSave}
     start={start}
     end={end}
     time={time}
    />
   </Grid>
  </Grid>
 );
}

export default MapPage;

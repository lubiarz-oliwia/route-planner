import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";

function RouteCalculator({ distance, time, onSaveRoute, start, end }) {
 const [cost, setCost] = useState(0);
 const multiplier = 1.1;
 const [kmCost, setKmCost] = useState(0);

 const handleChange = (event) => {
  let costValue = event.target.value;
  setKmCost(costValue);
  costCalculation(costValue);
 };

 const costCalculation = (kmCost) => {
  let final_cost = kmCost * distance * multiplier;
  return setCost(final_cost);
 };

 return (
  <Box
   justify="center"
   sx={{
    p: 2,
    borderRadius: 2,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "#fff",
   }}
  >
   <h5>
    Start point: <span>{start}</span>{" "}
   </h5>
   <h5>
    End point: <span>{end}</span>{" "}
   </h5>
   <h5>
    Distance: <span>{Math.floor(distance)} km</span>{" "}
   </h5>
   <h5>
    Time: <span>{time} hrs</span>{" "}
   </h5>
   <TextField
    onChange={handleChange}
    sx={{ my: 2 }}
    type="number"
    label="Amount for 1km"
    id="outlined-start-adornment"
    InputProps={{
     startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
   />
   <h5>
    The total cost: <span>{Math.floor(cost)} $</span>{" "}
   </h5>
   <Button
    variant="contained"
    color="primary"
    size="large"
    style={{
     fontSize: "12px",
     fontWeight: "500",
     marginTop: "20px",
     position: "relative",
     transform: "translateX(-50%)",
     left: "50%",
    }}
    onClick={onSaveRoute}
   >
    Save the route
   </Button>
  </Box>
 );
}

export default RouteCalculator;

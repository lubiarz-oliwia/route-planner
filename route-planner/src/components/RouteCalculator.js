import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

function RouteCalculator({ distance, onSaveRoute }) {
 const [cost, setCost] = useState(0);
 const multiplier = 1.1;
 const [kmCost, setKmCost] = useState(0);

 const handleChange = (event) => {
  let a = event.target.value;
  setKmCost(a);

  console.log(event.target.value);
  costCalculation(a);
 };

 function costCalculation(kmCost) {
  console.log(distance);
  let final_cost = kmCost * distance * multiplier;
  return setCost(final_cost);
 }

 return (
  <Box
   justify="center"
   sx={{ p: 2, width: "100%", borderRadius: 2, boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', backgroundColor: '#fff' }}
  >
   <h5>
    Start point: <span></span>{" "}
   </h5>
   <h5>
    End point: <span></span>{" "}
   </h5>
   <h5>
    Distance: <span>{Math.floor(distance)} km</span>{" "}
   </h5>
   <h5>
    Time: <span>{} hr</span>{" "}
   </h5>
   <TextField
    onChange={handleChange}
    sx={{my:2}}
    type="number"
    label="Amount for 1km"
    id="outlined-start-adornment"
    InputProps={{
     startAdornment: <InputAdornment position="start">$</InputAdornment>,
    }}
   />
   <h5>
    The total cost: <span>{cost} $</span>{" "}
   </h5>
   <Button
   style={{textTransform: 'lowercase'}}
    variant="contained"
    color="primary"
    size="large"
    onClick={onSaveRoute}
   >
    Save the route
   </Button>
  </Box>
 );
}

export default RouteCalculator;

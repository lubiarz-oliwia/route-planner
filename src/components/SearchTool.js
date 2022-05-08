import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { TextField, Autocomplete, Button, Box } from "@mui/material";
import { callApi } from "../utils";

function SearchTool() {
 let navigate = useNavigate();

 const [options, setOptions] = useState([]);

 const valueStartRef = useRef("");
 const valueEndRef = useRef("");

 const handleChange = (inputValue) => {
  const handleSuggestion = () => {
   callApi(inputValue, "SUGGEST").then((data) => {
    setOptions(data.suggestions.map((suggestion) => suggestion.label));
   });
  };
  const debouncer = debounce(handleSuggestion, 1000, { maxWait: 1000 });
  debouncer();
 };

 const sendValue = async () => {
  if (valueStartRef.current.value && valueEndRef.current.value) {
   const startPosition = await callApi(
    valueStartRef.current.value,
    "GEOCODE"
   ).then((data) => data.items[0].position);

   const endPosition = await callApi(valueEndRef.current.value, "GEOCODE").then(
    (data) => data.items[0].position
   );
   return navigate("/route-plan", {
    state: {
     start: valueStartRef.current.value,
     end: valueEndRef.current.value,
     startPointposition: startPosition,
     endPointposition: endPosition,
    },
   });
  } else return alert("Provide the start and end point");
 };

 return (
  <Box
   display="flex"
   flexDirection="column"
   alignItems="center"
   justify="center"
   sx={{
    minWidth: "240px",
    borderRadius: 2,
    maxWidth: "700px",
    p: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "#fff",
    mt: 5,
   }}
  >
   <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={options}
    sx={{ width: "100%", pb: 2 }}
    filterOptions={(x) => x}
    renderInput={(params) => (
     <TextField
      {...params}
      inputRef={valueStartRef}
      onChange={(e) => handleChange(e.target.value)}
      label="Choose starting point"
     />
    )}
   />
   <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={options}
    sx={{ width: "100%", pb: 4 }}
    filterOptions={(x) => x}
    renderInput={(params) => (
     <TextField
      {...params}
      inputRef={valueEndRef}
      onChange={(e) => handleChange(e.target.value)}
      label="Choose ending point"
     />
    )}
   />
   <Button
    style={{ fontSize: "12px", fontWeight: "500" }}
    variant="contained"
    color="primary"
    size="large"
    onClick={sendValue}
   >
    Get directions
   </Button>
  </Box>
 );
}

export default SearchTool;

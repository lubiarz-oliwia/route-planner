import React, { useEffect, useState, useRef, useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import AuthContext from "../store/context";
import authContext from "../store/context";
import LanguageContext from "../store/context";
import { Box } from "@mui/material";
import { callApi } from "../utils";

function SearchTool() {
 let navigate = useNavigate();

 const [options, setOptions] = useState([]);

 const valueStartRef = useRef("");
 const valueEndRef = useRef("");

 const handleChange = (inputValue) => {
  console.log(inputValue);
  const t = () => {
   callApi(inputValue, "SUGGEST").then((data) =>
    setOptions(data.suggestions.map((suggestion) => suggestion.label))
   );
  };
  const k = debounce(t, 1000, { maxWait: 1000 });
  k();
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
   sx={{ p: 10, border: "1px solid grey", width: "50%", borderRadius: 2, maxWidth: '500px' }}
  >
   <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={options}
    sx={{ width: "100%", pb: 2 }}
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
    style={{ fontSize: "12px", fontWeight: "600" }}
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

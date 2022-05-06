import { Button, Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import SearchTool from "../components/SearchTool";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LanguageContext from "../store/context";
import { useNavigate } from "react-router-dom";
import generatePDF, { createPdf } from "../utils";
import { generatePath } from "react-router-dom";

function SearchPage() {
 const { savedRoutes } = useContext(LanguageContext);
 const navigate = useNavigate();

 const navigateToMap = (route) => {
  navigate("/route-plan", {
   state: route,
  });
 };
console.log(savedRoutes)
 return (
  <Grid container >
   <Grid item xs={savedRoutes.length ? 6 : 12} style={savedRoutes.length ? null : {display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column'}}>
    <h1>Plan your route</h1>
    <SearchTool />
   </Grid>
   {savedRoutes.length ? <Grid item xs={6}>
    <h1>Saved routes</h1>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead>
       <TableRow>
        <TableCell>Start point</TableCell>
        <TableCell>End Point</TableCell>
        <TableCell>Actions</TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       {savedRoutes.map((route) => (
        <TableRow>
         <TableCell>{route.start}</TableCell>
         <TableCell>{route.end}</TableCell>
         <TableCell>
          <Button
           variant="contained"
           color="primary"
           size="small"
           onClick={() => navigateToMap(route)}
          >
           Show
          </Button>
          <Button 
           variant="contained"
           color="primary"
           size="small"
          onClick={() => generatePDF(route)}>
            GENERATE PDF
          </Button>
         </TableCell>
        </TableRow>
       ))}
      </TableBody>
     </Table>
    </TableContainer>
   </Grid> : null
  }
  </Grid>
  
 );
}

export default SearchPage;

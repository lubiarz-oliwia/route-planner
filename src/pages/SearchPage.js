import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
 Button,
 Grid,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
} from "@mui/material";
import RouteContext from "../store/context";
import generatePDF from "../utils";
import SearchTool from "../components/SearchTool";

function SearchPage() {
 const { savedRoutes } = useContext(RouteContext);
 const navigate = useNavigate();

 const navigateToMap = (route) => {
  navigate("/route-plan", {
   state: route,
  });
 };

 return (
  <Grid container sx={{ p: 5 }} gap={4}>
   <Grid
    item
    xs={12}
    md={savedRoutes.length ? 5 : 12}
    style={
     savedRoutes.length
      ? null
      : {
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         flexDirection: "column",
        }
    }
   >
    <h1>Plan your route</h1>
    <SearchTool />
   </Grid>
   {savedRoutes.length ? (
    <Grid item xs={12} md={6}>
     <h1>Saved routes</h1>
     <TableContainer component={Paper}>
      <Table  aria-label="simple table">
       <TableHead>
        <TableRow>
         <TableCell>Start point</TableCell>
         <TableCell>End Point</TableCell>
         <TableCell>Actions</TableCell>
         <TableCell></TableCell>
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
          </TableCell>
          <TableCell>
           <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => generatePDF(route)}
           >
            GENERATE PDF
           </Button>
          </TableCell>
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
    </Grid>
   ) : null}
  </Grid>
 );
}

export default SearchPage;

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = (props) => {
 const instance = L.Routing.control({
  waypoints: [L.latLng(props.ax, props.ay), L.latLng(props.bx, props.by)],
  lineOptions: {
   styles: [{ color: "red", weight: 2 }],
  },

  show: false,
  addWaypoints: false,
  routeWhileDragging: true,
  draggableWaypoints: false,
  fitSelectedRoutes: true,
  showAlternatives: false,
  // geocoder: L.Control.Geocoder.nominatim()
  // geocoder: L.Control.Geocoder.nominatim()

 });

 return instance.on("routesfound", function (e) {
  var routes = e.routes;
  console.log(routes);
  var summary = routes[0].summary;
  console.log(summary);
  let totalDistanceValueInKm = summary.totalDistance / 1000;
  props.setDistance(totalDistanceValueInKm);
  props.setSummary(routes)
  // alert time and distance in km and minutes
  // alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
 });
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;

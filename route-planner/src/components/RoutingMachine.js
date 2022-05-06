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
 });

 return instance.on("routesfound", function (e) {
  var routes = e.routes;
  var summary = routes[0].summary;
  let totalDistanceValueInKm = summary.totalDistance / 1000;
  let totalTimeValueInH = Math.round(summary.totalTime / 60 / 60);
  props.setDistance(totalDistanceValueInKm);
  props.setTime(totalTimeValueInH);
  props.setSummary(routes);
 });
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;

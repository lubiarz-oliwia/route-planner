import jsPDF from "jspdf";
import "jspdf-autotable";

let API_KEY = "aXwOot4QXwaQZazqTtmN4qxIHQ59kNzig3kYKwPD0z4";

export const callApi = (inputValue, type) => {
 let url = "";
 switch (type) {
  case "SUGGEST":
   url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${inputValue}`;
   break;

  case "GEOCODE":
   url = `https://geocode.search.hereapi.com/v1/geocode?q=${inputValue}`;
   break;
  default:
   break;
 }

 return fetch(`${url}&apiKey=${API_KEY}`).then((response) => response.json());
};

const generatePDF = (routes) => {
 const doc = new jsPDF();

 const tableColumn = ["Instruction", "Distance"];
 const tableRows = [];

 routes.summary[0].instructions.forEach((instruction) => {
  const ticketData = [
   instruction.text,
   Math.round(instruction.distance / 1000) + "km",
  ];
  tableRows.push(ticketData);
 });

 // startY is basically margin-top
 //   ticket title. and margin-top + margin-left
 doc.text("Start point: " + routes.start, 14, 15);
 doc.text("End point: " + routes.end, 14, 30);
 doc.text("Distance: " + routes.distance + " km", 14, 45);
 doc.text("Time: " + routes.time + " hrs", 14, 60);
 doc.autoTable(tableColumn, tableRows, { startY: 80 });
 doc.save(`report_${routes.end}.pdf`);
};

export default generatePDF;

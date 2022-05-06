import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";
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



// define a generatePDF function that accepts a tickets argument
const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Instruction", "Distance", "Issue", "Status", "Closed on"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
 
  tickets.summary[0].instructions.forEach(instruction => {
    const ticketData = [
      instruction.text,
      instruction.distance,
      // called date-fns to format the date on the ticket
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });


  // startY is basically margin-top

//   ticket title. and margin-top + margin-left
  doc.text('Start point: ' + tickets.start, 14, 15);
  doc.text('End point: ' + tickets.end, 14, 30);
  doc.text('Distance: ' + tickets.distance + 'km', 14, 45);
//   doc.text('Time: ' + tickets.summary[0].summary.totalTime + 'km', 14, 45);

  doc.text('Distance: ' + tickets.summary[0].name, 14, 60);
  doc.autoTable(tableColumn, tableRows, { startY:  120});

  // we define the name of our PDF file.
  doc.save(`report_${tickets.end}.pdf`);
};

export default generatePDF;
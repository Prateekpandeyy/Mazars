import axios from "axios";

// //for development

export default axios.create({
  baseURL: "https://stagingapi-advisorysolutions.mazars.co.in/v1",
  headers: {
    "Content-type": "application/json",
  },
});
// // //for server
// export default axios.create({
//   baseURL: "https://api-advisorysolutions.mazars.co.in/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

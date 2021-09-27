import axios from "axios";
export default axios.create({
  baseURL: "http://13.232.121.233/mazarsapi/v1",
  headers: {
    "Content-type": "application/json",
  },
});


// for server 

// export default axios.create({
//   baseURL: "https://mazarsapi.multitvsolution.com/mazarapi/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

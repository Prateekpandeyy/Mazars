<<<<<<< HEAD


 import axios from "axios";
export default axios.create({
  baseURL: "http://13.232.121.233/mazarsapi/v1",
  headers: {
    "Content-type": "application/json",
  },
});

 //for server 
=======
import axios from "axios";
>>>>>>> 05f9875472b9da7565b53a0d0e85aa0178386113
// export default axios.create({
//   baseURL: "http://13.232.121.233/mazarsapi/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

 //for server 
export default axios.create({
  baseURL: "https://mazarsapi.multitvsolution.com/mazarapi/v1",
  headers: {
    "Content-type": "application/json",
  },
});
<<<<<<< HEAD
import axios from "axios";
=======
 import axios from "axios";
>>>>>>> 9bb0a9ca5bffb1c6c093c95cb7c0f2e1e21214e9
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

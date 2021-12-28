<<<<<<< HEAD

 import axios from "axios";

=======
import axios from "axios";
>>>>>>> 017d64dacce4aa098b00c18c2a90fdccb68d4486
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
import axios from "axios";
//for local
// export default axios.create({
//   baseURL: "http://43.204.16.182/mazarapi/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

//for development
export default axios.create({
  baseURL: "https://stagingapi.masindia.live/v1",
  headers: {
    "Content-type": "application/json",
  },
}); 
//for server
// export default axios.create({
//   baseURL: "https://api.masindia.live/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// }); 
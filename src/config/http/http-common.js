import axios from "axios";
// export default axios.create({
//   baseURL: "http://43.204.16.182/mazarapi/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });

//for local
export default axios.create({
  baseURL: "https://stagingapi.masindia.live/v1",
  headers: {
    "Content-type": "application/json",
  },
});
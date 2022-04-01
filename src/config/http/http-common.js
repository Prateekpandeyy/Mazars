import axios from "axios";
export default axios.create({
  baseURL: "https://api.masindia.live/v1",
  headers: {
    "Content-type": "application/json",
  },
});

// for local
// export default axios.create({
//   baseURL: "https://stagingapi.masindia.live/v1",
//   headers: {
//     "Content-type": "application/json",
//   },
// });
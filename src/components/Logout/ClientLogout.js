import { baseUrl } from "../../config/config";
export const clientLogout = (axios, history) => {
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
    localStorage.removeItem("userid");
    localStorage.removeItem("custEmail");
    localStorage.removeItem("category");
    localStorage.removeItem("clientToken");
    history.push("/");
  });
};

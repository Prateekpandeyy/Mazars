import { baseUrl } from "../../config/config";
export const clientLogout = (axios, history) => {
  const token = window.localStorage.getItem("clientToken");
  const myConfig = {
    headers: {
      uit: token,
    },
  };

  axios.get(`${baseUrl}/customers/logout`, myConfig).then((res) => {
    axios
      .get(`${baseUrl}/customers/getCategory?pid=0`)
      .then((res) => {
        if (res.data.code === 1) {
          localStorage.removeItem("categoryData");
          let data = res.data.result;
          data.map((i) => {
            localStorage.removeItem(i.details);
          });
          localStorage.removeItem("userid");
          localStorage.removeItem("custEmail");
          localStorage.removeItem("category");
          localStorage.removeItem("clientToken");
          history.push("/");
        } else {
          localStorage.removeItem("userid");
          localStorage.removeItem("custEmail");
          localStorage.removeItem("category");
          localStorage.removeItem("clientToken");
          history.push("/");
        }
      })
      .catch((res) => {
        localStorage.removeItem("userid");
        localStorage.removeItem("custEmail");
        localStorage.removeItem("category");
        localStorage.removeItem("clientToken");
        history.push("/");
      });
  });
};

import http from "../http/http-common";

const getAll = () => {
  return http.get("/customers/getFeedback");
};

export default {
  getAll,
};

import http from "../http/http-common";

const getAll = () => {
  return http.get("/tp/getTaxProfessional");
};

const get = (id) => {
  return http.get(`/tp/getTaxProfessional?id=${id}`);
};

const create = (data) => {
  return http.post("/tutorials", data);
};

const remove = (id) => {
  return http.delete(`/tl/deleteTeamLeader?id=${id}`);
};

const editTL = (id) => {
  return http.get(`/tl/getTeamLeader?id=212`);
};

export default {
  getAll,
  get,
  create,
  remove,
  editTL
};

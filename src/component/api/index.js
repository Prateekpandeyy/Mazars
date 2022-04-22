import axiosInstance from "../../apiServices";

const getUserDetailsOnLogin = (details) => {
  return axiosInstance.post(`Main/Login_validate_USER?userId=${details}`);
};

const sendOtp = (details) => {
  return axiosInstance.post(
    "https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY",details 
  );
};

export default {
  getUserDetailsOnLogin,
  sendOtp
};

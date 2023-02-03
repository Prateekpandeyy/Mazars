import Swal from "sweetalert2";
const goToLogin = (history, message) => {
  Swal.fire({
    text: message,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Login",
    cancelButtonText: "Cancel",
  }).then((res) => {
    if (res.value === true) {
      history.push("/");
    }
  });
};
export { goToLogin };

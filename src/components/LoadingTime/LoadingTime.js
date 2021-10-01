import Swal from "sweetalert2";
 const LoadingError = (setLoading) => {
setTimeout(() =>{
    setLoading(false)
    Swal.fire({
        title : "error",
        html : "Something went wrong, Please try again",
        icon : "error"
    })
}, 30000)
}
export default {
    LoadingError
  };
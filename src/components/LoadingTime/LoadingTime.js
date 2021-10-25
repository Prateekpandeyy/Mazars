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

var timerOn = true;
const timer2 = (setTime, setDisabled) => {
    function timer(remaining) {
        var s = remaining % 60;
        s = s < 10 ? '0' + s : s;
        setTime(remaining)
        remaining -= 1;
        if (remaining >= 0 && timerOn) {
          setTimeout(function () {
            timer(remaining);
          }, 1000);
          return;
        }
        setDisabled(true)
       
      }
      timer(180);
}
export default {
    LoadingError, timer2
  };
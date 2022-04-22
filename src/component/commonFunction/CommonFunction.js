var timerOn = true;
const timer2 = (setTime, setDisabled) => {
  function timer(remaining) {
    var s = remaining % 60;
    s = s < 10 ? "0" + s : s;
    setTime(remaining);
    remaining -= 1;
    if (remaining >= 0 && timerOn) {
      setTimeout(function () {
        timer(remaining);
      }, 1000);
      return;
    }
    setDisabled(true);
  }
  timer(180);
};
export { timer2 };

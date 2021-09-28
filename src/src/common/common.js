//change date format

const changeFormateDate = (oldDate) => {
  if (oldDate == null) {
    return null;
  }
  return oldDate.toString().split("-").reverse().join("-");
};




//remove time with date
const removeTime = (oldDate) => {
  if (oldDate == null) {
    return null;
  }
  return oldDate.slice(0, 10).toString().split("-").reverse().join("-");
};




//removeDATE with TIME
const removeDate = (oldDate) => {
  if (oldDate == null) {
    return null;
  } else {
    var split = oldDate.split(" ");
    var a = split[0];
    var b = split[1];
    return b;
  }
};


//capitalizeFirstLetter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default {
  changeFormateDate,
  removeTime,
  removeDate,
  capitalizeFirstLetter
};

// var updatedate = oldDate.split(" ")[0];
// var updatedate = oldDate.slice(0, 10);

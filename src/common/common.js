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

function clientLogout(history) {
  localStorage.removeItem("userid");
  localStorage.removeItem("custEmail");
  localStorage.removeItem("category");
  localStorage.removeItem("clientToken");
  localStorage.removeItem("custArrowProposal3");
  localStorage.removeItem("userid");
  localStorage.removeItem("custEmail");
  localStorage.removeItem("category");
  localStorage.removeItem("clientToken");
  localStorage.removeItem("custArrowMsg");
  localStorage.removeItem("prevcustmsg");
  localStorage.removeItem("custMessage");
  localStorage.removeItem("freezecustMsg");
  localStorage.removeItem("custQuery1");
  localStorage.removeItem("custQuery2");
  localStorage.removeItem("custQuery3");
  localStorage.removeItem("custQuery4");
  localStorage.removeItem(`freezecustQuery1`);
  localStorage.removeItem(`freezecustQuery2`);
  localStorage.removeItem(`freezecustQuery3`);
  localStorage.removeItem(`freezecustQuery4`);
  localStorage.removeItem("custArrowQuery1");
  localStorage.removeItem("prevcustq1");
  localStorage.removeItem("searchDatacustQuery1");
  localStorage.removeItem("custArrowQuery2");
  localStorage.removeItem("prevcustq2");
  localStorage.removeItem("searchDatacustQuery2");
  localStorage.removeItem("custArrowQuery3");
  localStorage.removeItem("prevcustq3");
  localStorage.removeItem("searchDatacustQuery3");
  localStorage.removeItem("custArrowQuery4");
  localStorage.removeItem("prevcustq4");
  localStorage.removeItem("searchDatacustQuery4");
  localStorage.removeItem("searchDatacustProposal1");
  localStorage.removeItem("custProposal1");
  localStorage.removeItem(`freezecustProposal1`);
  localStorage.removeItem("custArrowProposal1");
  localStorage.removeItem("prevcustp1");
  localStorage.removeItem("searchDatacustProposal2");
  localStorage.removeItem("custProposal2");
  localStorage.removeItem(`freezecustProposal2`);
  localStorage.removeItem("custArrowProposal2");
  localStorage.removeItem("prevcustp2");
  localStorage.removeItem("searchDatacustProposal3");
  localStorage.removeItem("custProposal3");
  localStorage.removeItem(`freezecustProposal3`);
  localStorage.removeItem("custArrowProposal3");
  localStorage.removeItem("prevcustp3");
  localStorage.removeItem("searchDatacustProposal4");
  localStorage.removeItem("custProposal4");
  localStorage.removeItem(`freezecustProposal4`);
  localStorage.removeItem("custArrowProposal4");
  localStorage.removeItem("prevcustp4");
  localStorage.removeItem("searchDatacustPay1");
  localStorage.removeItem("custPay1");
  localStorage.removeItem(`freezecustPay1`);
  localStorage.removeItem("custArrowPay1");
  localStorage.removeItem("prevcustPay1");
  localStorage.removeItem("searchDatacustPay2");
  localStorage.removeItem("custPay2");
  localStorage.removeItem(`freezecustPay2`);
  localStorage.removeItem("custArrowPay2");
  localStorage.removeItem("prevcustPay2");
  localStorage.removeItem("searchDatacustPay3");
  localStorage.removeItem("custPay3");
  localStorage.removeItem(`freezecustPay3`);
  localStorage.removeItem("custArrowPay3");
  localStorage.removeItem("prevcustPay3");
  localStorage.removeItem("searchDatacustAs1");
  localStorage.removeItem("custAs1");
  localStorage.removeItem(`freezecustAs1`);
  localStorage.removeItem("custArrowAs1");
  localStorage.removeItem("prevcustAs1");
  localStorage.removeItem("searchDatacustAs2");
  localStorage.removeItem("custAs2");
  localStorage.removeItem(`freezecustAs2`);
  localStorage.removeItem("custArrowAs2");
  localStorage.removeItem("prevcustAs2");
  localStorage.removeItem("searchDatacustAs3");
  localStorage.removeItem("custAs3");
  localStorage.removeItem(`freezecustAs3`);
  localStorage.removeItem("custArrowAs3");
  localStorage.removeItem("prevcustAs3");
  localStorage.removeItem("searchDatacustAs4");
  localStorage.removeItem("custAs4");
  localStorage.removeItem(`freezecustAs4`);
  localStorage.removeItem("custArrowAs4");
  localStorage.removeItem("prevcustAs4");
  localStorage.removeItem("searchDatacustAs5");
  localStorage.removeItem("custAs5");
  localStorage.removeItem(`freezecustAs5`);
  localStorage.removeItem("custArrowAs5");
  localStorage.removeItem("prevcustAs5");
  history.push("/");
}
export default {
  changeFormateDate,
  removeTime,
  removeDate,
  capitalizeFirstLetter,
  clientLogout,
};

// var updatedate = oldDate.split(" ")[0];
// var updatedate = oldDate.slice(0, 10);

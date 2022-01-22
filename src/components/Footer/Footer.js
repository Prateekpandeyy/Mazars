import React from "react";
import "../../assets/css/style.css";
import MyPDF from "../../views/dFile/LoginManual.pdf"
import MyPDF2 from "../../views/dFile/Manual.docx"
function Footer() {
  const userid = window.localStorage.getItem("userid")
  return (
    <>
      <footer>
        <div className="text-center">
          <p>Copyright @ 2021. All right reserved.</p>
        </div>
        {userid ?
        <a href={MyPDF2} style={{ textAlign: "center", display : "block", width : "200px", margin : "20px auto" }}  download>Need help?</a>
:
<a href={MyPDF} style={{ textAlign: "center", display : "block", width : "200px", margin : "auto" }} download> Need help?</a>
      }
      </footer>
    </>
  );
}

export default Footer;

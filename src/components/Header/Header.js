import { Link, useHistory } from "react-router-dom";
import "../../assets/css/style.css";
import mazars from "../../assets/images/mazars-logo.png";

function Header({ id, cust_sign, noAdminSign, noTlSign, noTpSign, admin, mtl, mtp, noSign, loginOTP }) {
  let history = useHistory();

  const custLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("category");
    history.push("/customer/signin");
  }

 

  return (
    <>
      <div className="header">
        {id && (
          <div>
            <Link to="/customer/questionnaire-page">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {cust_sign && (
          <div>
            <Link to="/">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {noSign && (
          <div>
            <Link to="/">
              <img src={mazars} className="logo" alt="mazar"/>
            </Link>
          </div>
        )}


        {loginOTP && (
          <div>
            <img src={mazars} className="logo" alt="mazar"/>
          </div>
        )}

        {admin && (
          <div>
            <Link to="/admin/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtl && (
          <div>
            <Link to="/teamleader/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtp && (
          <div>
            <Link to="/taxprofessional/start">
              <img src={mazars} className="logo" alt="mazar" />
            </Link>
          </div>
        )}

        <div>
          {id && (
            <ul className="menu">
              <li style={{ color: "#fff" }}>{id}</li>
              <li onClick={custLogout} style={{ color: "#fff" }}>
                <i className="fa fa-sign-out">logout</i>
              </li>
            </ul>
          )}

          {cust_sign && (
            <div>
              <ul className="menu">
                <li style={{backgroundColor: "rgb(61, 71, 117)"}}>
                  <Link to="/">Sign In</Link>
                </li>             
              </ul>
            </div>
          )}
         
          {admin && !noAdminSign && (
            <ul className="menu">
              <li>
                <Link to="/admin/login">Sign In</Link>
              </li>
            </ul>
          )}

          {mtl && !noTlSign && (
            <ul className="menu">
              <li>
                <Link to="/teamleader/login">Sign In</Link>
              </li>
            </ul>
          )}

          {mtp && !noTpSign && (
            <ul className="menu">
              <li>
                <Link to="/taxprofessional/login">Sign In</Link>
              </li>
            </ul>
          )}



        </div>
      </div>
    </>
  );
}

export default Header;
 {/* <li>
                  <Link to="/customer/signup">SignUp</Link>
                </li> */}
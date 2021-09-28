import { Link, useHistory } from "react-router-dom";
import "../../assets/css/style.css";
import mazars from "../../assets/images/mazars-logo.png";

function Header({ id, cust_sign, admin, mtl, mtp, noSign, loginOTP }) {
  let history = useHistory();

  const custLogout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem("uid");
    localStorage.removeItem("category");
    history.push("/customer/signin");
  }

  console.log("hid:", id);

  return (
    <>
      <div class="header">
        {id && (
          <div>
            <Link to="/customer/questionnaire-page">
              <img src={mazars} class="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {cust_sign && (
          <div>
            <Link to="/">
              <img src={mazars} class="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {noSign && (
          <div>
            <Link to="/">
              <img src={mazars} class="logo" alt="mazar" style={{ marginBottom: "12px" }} />
            </Link>
          </div>
        )}


        {loginOTP && (
          <div>
            <img src={mazars} class="logo" alt="mazar" style={{ marginBottom: "12px" }} />
          </div>
        )}

        {admin && (
          <div>
            <Link to="/admin/start">
              <img src={mazars} class="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtl && (
          <div>
            <Link to="/teamleader/start">
              <img src={mazars} class="logo" alt="mazar" />
            </Link>
          </div>
        )}

        {mtp && (
          <div>
            <Link to="/taxprofessional/start">
              <img src={mazars} class="logo" alt="mazar" />
            </Link>
          </div>
        )}

        <div>
          {id && (
            <ul class="menu">
              <li style={{ color: "#fff" }}>{id}</li>
              <li onClick={custLogout} style={{ color: "#fff" }}>
                <i class="fa fa-sign-out">logout</i>
              </li>
            </ul>
          )}

          {cust_sign && (
            <div>
              <ul class="menu">
                <li>
                  <Link to="/">Signin</Link>
                </li>             
              </ul>
            </div>
          )}
         
          {admin && (
            <ul class="menu">
              <li>
                <Link to="/admin/login">Signin</Link>
              </li>
            </ul>
          )}

          {mtl && (
            <ul class="menu">
              <li>
                <Link to="/teamleader/login">Signin</Link>
              </li>
            </ul>
          )}

          {mtp && (
            <ul class="menu">
              <li>
                <Link to="/taxprofessional/login">Signin</Link>
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
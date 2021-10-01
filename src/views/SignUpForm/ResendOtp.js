
import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Alerts from "../../common/Alerts";
import { Spinner } from 'reactstrap';


function ResendOtp({ invalid, wEmail, indNumError, zipError, passError, email,
    phone, setDisabled, getTime, setLoad, loading, emailError, phoneError, zipError1, setLoading }) {

    const { handleSubmit, errors, reset } = useForm();

    const onSubmit = (value) => {
        if (emailError === true || phoneError === true || zipError1 === true)  {
           return false
              }
              else {
                setLoading(true)
                let formData = new FormData();
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("p", "registration");
        
                if (invalid || wEmail || indNumError || zipError || passError) {
                    console.log("resend false")
                    setLoad(false)
                }
                else {
                    console.log("send otp true")
                    axios({
                        method: "POST",
                        url: `${baseUrl}/customers/forgototp`,
                        data: formData,
                    })
                        .then(function (response) {
                            console.log("res-", response);
                            if (response.data.code === 1) {
                                Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
                                setDisabled(false)
                                getTime();
                                setLoad(true)
                                setLoading(false)
                            } if (response.data.code === 0) {
                                setLoading(false)
                            }
                        })
                        .catch((error) => {
                            console.log("erroror - ", error);
                        });
                    }
                   }
     
        
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div style={{ paddingTop: "10px" }}>
                    <button type="submit" class="btn btn-success">SEND OTP</button>
                </div>

            </form>
        </>
    );
}

export default ResendOtp;


// import React from 'react';
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { baseUrl } from "../../config/config";
// import Alerts from "../../common/Alerts";
// import { Spinner } from 'reactstrap';


// function ResendOtp({ invalid, wEmail, indNumError, zipError, passError, email,
//     phone, setDisabled, getTime, setLoad, loading, setLoading }) {

//     const { handleSubmit, errors, reset } = useForm();

//     const onSubmit = (value) => {
//         setLoading(true)
//         let formData = new FormData();
//         formData.append("email", email);
//         formData.append("phone", phone);
//         formData.append("p", "registration");

//         if (invalid || wEmail || indNumError || zipError || passError) {
//             console.log("resend false")
//             setLoad(false)
//         }
//         else {
//             console.log("send otp true")
//             axios({
//                 method: "POST",
//                 url: `${baseUrl}/customers/forgototp`,
//                 data: formData,
//             })
//                 .then(function (response) {
//                     console.log("res-", response);
//                     if (response.data.code === 1) {
//                         Alerts.SuccessNormal("As per your request , OTP has been sent to your email address.")
//                         setDisabled(false)
//                         getTime();
//                         setLoad(true)
//                         setLoading(false)
//                     } if (response.data.code === 0) {
//                         setLoading(false)
//                     }
//                 })
//                 .catch((error) => {
//                     console.log("erroror - ", error);
//                 });
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmit)}>

//                 <div style={{ paddingTop: "10px" }}>
//                     <button type="submit" class="btn btn-success">SEND OTP</button>
//                 </div>

//             </form>
//         </>
//     );
// }

// export default ResendOtp;

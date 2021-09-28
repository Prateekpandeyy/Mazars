import Swal from "sweetalert2";

// SuccessLogin
const SuccessLogin = () => {
    return (
        Swal.fire(
            'Success',
            'Login Successfully',
            'success'
        )
    )
}


// ErrorLogin
const ErrorLogin = () => {
    return (
        Swal.fire(
            "Oops...",
            "Error : Incorrect Email OR Password",
            "error"
        )
    )
}


// ErrorLogin
const ErrorOTP = (variable) => {
    return (
        Swal.fire(
            "Oops...",
            ` ${variable} </br> `,
            "error"
        )
    )
}


// Success
const SuccessMsg = (variable, key) => {
    return (
        Swal.fire(
            'Success',
            ` ${variable ? variable : ""} </br> </br>
             ${key.faill ? key.faill : ""} </br></br> 
              ${key.success ? key.success : ""}`,
            'success'
        )
    )
}


// Success
const SuccessReport = (message) => {
    if (message.invalid) {
        Swal.fire(
            "Error",
            `${message.invalid}`,
            "error"
        )
    } else if (message.faill && message.success) {
        Swal.fire(
            'Success',
            ` ${message.faill} <br/><br/> 
            ${message.success}`,
            'success'
        )
    } else if (message.success) {
        Swal.fire(
            'Success',
            ` ${message.success}`,
            'success'
        )
    }
    else if (message.faill) {
        Swal.fire(
            'Error',
            ` ${message.faill} <br/>`,
            'error'
        )
    }
}




// ErrorLogin
const ErrorDelete = () => {
    return (
        Swal.fire(
            "Error",
            "Permission denied.",
            "error"
        )
    )
}

// ErrorLogin
const ErrorEdit = () => {
    return (
        Swal.fire(
            "Error",
            "Permission denied.",
            "error"
        )
    )
}


// SuccessNormal
const SuccessNormal = (variable) => {
    return (
        Swal.fire(
            'Success',
            ` ${variable} </br> `,
            'success'
        )
    )
}


// ErrorNormal
const ErrorNormal = (variable) => {
    return (
        Swal.fire(
            'Error',
            ` ${variable} </br> `,
            'error'
        )
    )
}



export default {
    SuccessLogin,
    ErrorLogin,
    SuccessMsg,
    SuccessNormal,
    SuccessReport,
    ErrorDelete,
    ErrorEdit,
    ErrorNormal,
    ErrorOTP,
};




// Swal.fire(`oops : ${response.data.result}`)
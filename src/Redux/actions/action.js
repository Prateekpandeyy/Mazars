import {ActionTypes} from "../constants/actionTypes";

export const setLoginDetails = (payload)=>{
    return {
        type: ActionTypes.SET_LOGIN_DETAILS,
        payload:payload
    };
}

export const fetchUserDetails = (payload)=>{
    return {
        type: ActionTypes.FETCH_USER_DETAILS,
        payload:payload
    }
}

export const setOtpBoxOpen = (payload) =>{
    return {
        type: ActionTypes.SET_OTP_BOX_OPEN,
        payload:payload
    }
}


import {ActionTypes} from "../constants/actionTypes";

const initialState = {
    AuthDetails:{},
    setOtpBoxOpen:false
}

export const LoginReducer = (state= initialState, {type,payload})=>{
    switch(type) {
        case ActionTypes.SET_LOGIN_DETAILS:
            return {
                ...state,
                AuthDetails:{
                    ...payload
                }
            }
        case ActionTypes.SET_OTP_BOX_OPEN:
            return{
                ...state,
                setOtpBoxOpen:payload
            }
        default:
            return state;
    }
}
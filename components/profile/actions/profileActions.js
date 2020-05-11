import {
    REQUEST_PROFILE,
    REQUEST_PROFILE_SUCCESS,
    REQUEST_PROFILE_FAILED
} from "../../actionTypes"


export const  requestProfile = (data) => ({
    type:REQUEST_PROFILE,
    data
})

export const requestProfileSuccess = (data) => ({
    type:REQUEST_PROFILE_SUCCESS,
    data
})

export const requestProfileFailed = (data) => ({
    type:REQUEST_PROFILE_FAILED,
    data
})
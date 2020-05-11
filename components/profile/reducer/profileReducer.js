import {
  REQUEST_PROFILE,
  REQUEST_PROFILE_FAILED,
  REQUEST_PROFILE_SUCCESS,
  USER_LOGGED_OUT,
  FORCE_LOGOUT_USER
} from "../../actionTypes";

const initState = {
  requestProfile: false,
  profile: null,
  profileImage: null,
  retailerName: null,
  errorMessage: null
};

export default function profileReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_PROFILE:
      return {
        ...state,
        requestProfile: true,
        profile: null,
        profileImage: null,
        retailerName: null,
        errorMessage: null
      };
    case REQUEST_PROFILE_SUCCESS:
      return {
        ...state,
        requestProfile: false,
        profile: action.data,
        profileImage: getProfileImage(action.data),
        retailerName: getProfileUsername(action.data),
        errorMessage: null
      };

    case REQUEST_PROFILE_FAILED:
      return {
        requestProfile: false,
        profile: action.data,
        profileImage: null,
        retailerName: null,
        errorMessage: action.data
      };
    case FORCE_LOGOUT_USER:
    case USER_LOGGED_OUT:
      return {
        requestProfile: false,
        profile: null,
        profileImage: null,
        retailerName: null,
        errorMessage: null
      };

    default:
      return {
        ...state
      };
  }
}

function getProfileImage(profile) {
  if (profile && profile.advanceinfo && profile.advanceinfo.logo) {
    return {
      imageId: profile.advanceinfo.logo.imageId,
      url: profile.advanceinfo.logo.url
    };
  }
}

function getProfileUsername(profile) {
  if (profile) {
    return profile.username;
  }
}

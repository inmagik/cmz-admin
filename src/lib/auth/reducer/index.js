import {
  // Form login auth actions
  LOGIN_LOADING,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,

  // Initial auth from local storage token actions
  AUTH_WITH_TOKEN_LOADING,
  AUTH_WITH_TOKEN_FAILURE,
  AUTH_WITH_TOKEN_SUCCESS,

  // Refresh token actions
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,

  // Logout action
  LOGOUT
} from '../actions';

// For future configuration over standar reducer...
const auth = (config) => {
  const initialState = {
    user: null,
    token: null,
    loginLoading: false,
    loginError: null,
    authenticatingWithToken: false,
    refreshingToken: false,
  };

  return (previousState = initialState, { type, payload, error }) => {
    switch (type) {
    case LOGIN_LOADING:
      return {
        ...previousState,
        loginLoading: true,
        loginError: null,
      };
    case LOGIN_FAILURE:
      return {
        ...previousState,
        loginLoading: false,
        loginError: error,
      };
    case LOGIN_SUCCESS:
      return {
        ...previousState,
        loginLoading: false,
        user: payload.user,
        token: payload.token,
      };
    case AUTH_WITH_TOKEN_LOADING:
      return {
        ...previousState,
        authenticatingWithToken: true,
      };
    case AUTH_WITH_TOKEN_FAILURE:
      return {
        ...previousState,
        authenticatingWithToken: false,
      };
    case AUTH_WITH_TOKEN_SUCCESS:
      return {
        ...previousState,
        authenticatingWithToken: false,
        user: payload.user,
        token: payload.token,
      };
    case REFRESH_TOKEN_LOADING:
      return {
        ...previousState,
        refreshingToken: true,
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...previousState,
        refreshingToken: false,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...previousState,
        refreshingToken: false,
        token: payload.token,
      };
    case LOGOUT:
      return initialState;
    default:
      return previousState;
    }
  };
};

export default auth;

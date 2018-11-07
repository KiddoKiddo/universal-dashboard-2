import {
  LOAD_DASHBOARD,
  CREATE_DASHBOARD,
  SAVE_DASHBOARD,
  DELETE_DASHBOARD,
  ADD_SOCKET_DATA,
  STATUS_SUCCESS,
  STATUS_FAIL,
} from '../actions/dashboardActions';

const initialState = {
  config: {},
  data: {},
  status: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STATUS_SUCCESS:
      return Object.assign({}, state, {
        status: action.payload,
      });

    case STATUS_FAIL:
      return Object.assign({}, state, {
        status: action.payload,
      });

    case LOAD_DASHBOARD:
      return Object.assign({}, state, {
        config: action.config,
      });

    case ADD_SOCKET_DATA:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          [action.id]: action.payload,
        },
      });

    default:
      return state;
  }
};

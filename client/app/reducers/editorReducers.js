import {
  LOAD_DASHBOARD,
  STATUS_SUCCESS,
  STATUS_FAIL,
} from '../actions/dashboardActions';

const initialState = {
  config: {},
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
    //
    // case CREATE_DASHBOARD:
    //   return {
    //     // data: [action.post, ...state.data],
    //     panels: action.id,
    //   };
    //
    // case SAVE_DASHBOARD:
    //   return {
    //     // data: action.posts,
    //     panels: action.id,
    //   };
    //
    // case DELETE_DASHBOARD:
    //   return {
    //     // data: state.data.filter(post => post.cuid !== action.cuid),
    //     panels: action.id,
    //   };

    default:
      return state;
  }
};

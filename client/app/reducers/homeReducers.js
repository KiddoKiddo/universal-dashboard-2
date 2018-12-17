import {
  LOAD_DASHBOARDS,
} from '../actions/homeActions';

const initialState = {
  dashboards: [],
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case LOAD_DASHBOARDS:
      return Object.assign({}, state, {
        dashboards: action.dashboards,
      });
    default:
      return state;
  }
};

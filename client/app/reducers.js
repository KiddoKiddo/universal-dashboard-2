import { combineReducers } from 'redux';
import dashboard from './reducers/dashboardReducers';
import editor from './reducers/editorReducers';
import home from './reducers/homeReducers';

export default combineReducers({
  dashboard,
  editor,
  home,
});

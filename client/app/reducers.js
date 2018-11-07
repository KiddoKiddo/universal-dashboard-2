import { combineReducers } from 'redux';
import dashboard from './reducers/dashboardReducers';
import editor from './reducers/editorReducers';

export default combineReducers({
  dashboard,
  editor,
});

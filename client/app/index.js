import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Editor from './components/Editor/Editor';

import reducers from './reducers';

// Combine all vendor css(es)
import './styles/styles.scss';

const store = createStore(
  reducers,
  {}, // Initial state
  compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

render((
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard/:id" component={Dashboard} />
          <Route path="/editor/:id" component={Editor} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));

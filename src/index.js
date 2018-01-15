import '~/src/styles/main.css';
import '~/node_modules/bootstrap/dist/css/bootstrap.css';
import '~/src/styles/bootstrap-theme.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import RouteContainer from './RouteContainer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { testActions } from './actions/testActions.js';
import { CookiesProvider } from 'react-cookie';
injectTapEventPlugin();

const store = configureStore();

render(
  <CookiesProvider>
    <Provider store={store}>
        <RouteContainer store={store} />
      </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);

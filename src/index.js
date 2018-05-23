import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import { Provider } from 'react-redux';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

import 'github-markdown-css'
import './font/iconfont.css'
import './style/base.css'

const render = Component => {
  ReactDOM.render(
  <Provider store={ store }>
    <Component />
  </Provider>,
    document.getElementById('root'),
  )
}
render(Route);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./router/', () => {
    render(Route);
  })
}

registerServiceWorker();

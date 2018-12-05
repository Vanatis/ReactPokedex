import React from 'react';
import ReactDOM from 'react-dom';
import App from './Containers/App';

import registerServiceWorker from './registerServiceWorker';

import 'tachyons';
import './index.css';

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);
registerServiceWorker();

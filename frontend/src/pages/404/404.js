import React from 'react';
import ReactDOM from 'react-dom';
import './404.css';
import NotFound from '../../components/NotFound/Notfound';
import * as serviceWorker from '../../serviceWorker';

ReactDOM.render(<NotFound/>, document.getElementById('root'));

serviceWorker.unregister();

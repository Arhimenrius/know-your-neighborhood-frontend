import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root'),
);

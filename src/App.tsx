import * as React from 'react';
import { Route } from 'react-router';
import NavBar from './components/NavBar';
import Map from './route/Map';
import Instructions from './route/Instructions';

export default () => (
    <div>
        <header>
            <NavBar />
        </header>
        <main>
            <Route exact path="/" component={Map} />
            <Route exact path="/instructions" component={Instructions} />
        </main>
        <footer />
    </div>
);

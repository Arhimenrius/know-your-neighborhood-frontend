import * as React from 'react';
import NavBar from './components/NavBar';
import { Route } from 'react-router';
import Home from './route/Home';
import Instructions from './route/Instructions';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <NavBar />
                </header>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/instructions" component={Instructions} />
                </main>
                <footer>

                </footer>
            </div>
        )
    }
}

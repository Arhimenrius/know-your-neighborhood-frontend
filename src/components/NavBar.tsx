import * as React from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import NavRouteLink from './NavRouteLink';

interface ComponentState {
    isOpen: boolean;
}

export default class NavBar extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = { isOpen: false };

        this.toggle = this.toggle.bind(this);
    }

    private toggle() {
        this.setState((state: {isOpen: boolean}) => ({
            isOpen: !state.isOpen,
        }));
    }

    public render() {
        const { isOpen } = this.state;
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Know Your Neighborhood</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavRouteLink tag={RRNavLink} exact to="/" activeClassName="active">Map</NavRouteLink>
                        </NavItem>
                        <NavItem>
                            <NavRouteLink tag={RRNavLink} exact to="/instructions" activeClassName="active">Instruction</NavRouteLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/Arhimenrius/know-your-neighborhood-frontend">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

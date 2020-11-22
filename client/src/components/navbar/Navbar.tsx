import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggle = () => setIsOpen(prevState => !prevState)

    return (
        <div style={{marginBottom: '30px'}}>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">ToDo</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/AndIReyf">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>Made by Andy</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}
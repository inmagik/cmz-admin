import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { logout } from '../../../auth/actions';

const Layout = ({ children, brand, menutItems, logout, isLoading, menu }) => (
  <div>
    <Navbar color="inverse" dark fixed="top">
      <NavbarBrand tag={Link} to="/" className="navbar-title">{brand}</NavbarBrand>
      {isLoading && <Nav className="pull-xs-left" navbar>
        <NavItem>
          <i className="fa fa-cog fa-spin fa-2x fa-fw" style={{ color: "deepskyblue" }} />
        </NavItem>
      </Nav>}
      <Nav className="pull-xs-right" navbar>
        <NavItem>
          <NavLink onClick={() => logout()} tag={'div'} className="pointer">Logout</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    <div className="main-container">
      <div className="sidebar">
        {menu}
      </div>
      <div className="main">{children}</div>
    </div>
  </div>
);

export default connect((state) => ({
  isLoading: state.cmz.loading > 0,
}), { logout })(Layout);

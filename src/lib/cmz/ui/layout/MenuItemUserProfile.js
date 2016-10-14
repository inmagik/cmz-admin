import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';

export const MenuItemUserProfile = ({ user, children, to, icon }) => (
  <MenuItem to={to} icon={icon}>
    {React.createElement(children, { user })}
  </MenuItem>
);

MenuItemUserProfile.defaultProps = {
  icon: 'fa fa-user'
};

export default connect((state) => ({
  user: state.cmz.auth.user,
}))(MenuItemUserProfile);

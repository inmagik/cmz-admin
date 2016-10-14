import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const MenuItem = ({ to, children, icon }) => (
  <Link className="menu-item" to={to}>
    <div>
      {icon && (<i className={`${icon}`} /> )}
      {icon && ' '}
      {children}
    </div>
  </Link>
);

export default MenuItem;

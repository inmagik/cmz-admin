import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const MenuItem = ({ to, children, icon }) => (
  <Link className="menu-item" to={to}>
    <div>
      {icon && <span><i className={icon} />{' '}</span>}
      {children}
    </div>
  </Link>
);

export default MenuItem;

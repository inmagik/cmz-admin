import React from 'react';
import { Link } from 'react-router';

// TODO: Implement selection or other similar stuff when match url...
const MenuItem = ({ to, children, icon }) => (
  <Link className="menu-item" to={to}>
    <div>
      {icon && <span><i className={icon} />{' '}</span>}
      {children}
    </div>
  </Link>
);

export default MenuItem;

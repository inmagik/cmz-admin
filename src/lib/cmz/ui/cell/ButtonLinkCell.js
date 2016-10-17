import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'reactstrap';

const ButtonLinkCell = ({ resource, basePath, source, record = {}, to, icon, children, ...passDownProps }) => (
  <Button tag={Link} to={to({ basePath, record })} {...passDownProps}>
    {icon && <i className={icon} />}
    {icon && ' '}
    {children}
  </Button>
);

ButtonLinkCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
  to: PropTypes.func.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default ButtonLinkCell;

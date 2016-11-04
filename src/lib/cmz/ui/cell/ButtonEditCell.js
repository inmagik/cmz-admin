import React, { PropTypes } from 'react';
import ButtonLinkCell from './ButtonLinkCell';

const ButtonEditCell = ({ children, ...passDownProps }) => (
  <ButtonLinkCell
    {...passDownProps}
    to={({ record, basePath }) => `${basePath}/${record.id}`}>{children}</ButtonLinkCell>
);

ButtonEditCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ButtonEditCell.defaultProps = {
  icon: 'fa fa-pencil',
  children: 'Edit'
};

export default ButtonEditCell;

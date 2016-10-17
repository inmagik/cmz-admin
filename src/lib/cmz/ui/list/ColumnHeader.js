import React, {PropTypes} from 'react';

const ColumnHeader = ({ label, source, currentSort: { sort, order }, updateSort }) => (
  source
  ?
  (<th style={{ cursor: 'pointer' }} onClick={updateSort} data-sort={source}>
    {sort === source &&
      <span><i className={`fa fa-caret-${order === 'DESC' ? 'down' : 'up'}`}></i>{' '}</span>
    }
    {label}
  </th>)
  :
  <th>{label}</th>
);

ColumnHeader.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  label: PropTypes.string,
  source: PropTypes.string,
  currentSort: React.PropTypes.shape({
    sort: React.PropTypes.string,
    order: React.PropTypes.string,
  }),
  updateSort: PropTypes.func.isRequired,
};

export default ColumnHeader;

import React, {PropTypes} from 'react';

const ColumnHeader = ({ width, label, source, currentSort: { sort, order }, updateSort }) => (
  source
  ?
  (<th style={{ cursor: 'pointer', width }} onClick={updateSort} data-sort={source}>
    {sort === source &&
      <span><i className={`fa fa-caret-${order === 'DESC' ? 'down' : 'up'}`}></i>{' '}</span>
    }
    {label}
  </th>)
  :
  <th style={{ width }}>{label}</th>
);

ColumnHeader.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  width: PropTypes.string,
  label: PropTypes.string,
  source: PropTypes.string,
  currentSort: React.PropTypes.shape({
    sort: React.PropTypes.string,
    order: React.PropTypes.string,
  }),
  updateSort: PropTypes.func.isRequired,
};

export default ColumnHeader;

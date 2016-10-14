import React, { Component } from 'react';
import { Table } from 'reactstrap';

const DataTable = ({ resource, basePath, columns, row, ids, data, currentSort, updateSort }) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          {React.Children.toArray(columns).map((column, index) => (
            React.createElement(column.props.header, {
              key: column.props.source || column.props.label || index,
              label: column.props.label,
              currentSort,
              updateSort,
              basePath,
              resource,
            })
          ))}
        </tr>
      </thead>
      <tbody>
        {ids.map(id => React.createElement(row, {
          key: id,
          record: data[id],
          resource,
          basePath,
          columns
        }))}
      </tbody>
    </Table>
  );
};

// DataTable.propTypes = {
//   columns: propTypes.node,
//   row: PropTypes.element,
// };

export default DataTable;

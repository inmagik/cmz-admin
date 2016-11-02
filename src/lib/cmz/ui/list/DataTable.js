import React from 'react';
import { Table } from 'reactstrap';

const DataTable = ({ resource, basePath, columns, row, ids, data, currentSort, updateSort, language }) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          {React.Children.toArray(columns).map((column, index) => (
            React.createElement(column.props.header, {
              width: `calc(100%/${columns.length})`,
              key: column.props.source || column.props.label || index,
              label: column.props.label,
              source: column.props.source,
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
          language,
          resource,
          basePath,
          columns
        }))}
      </tbody>
    </Table>
  );
};

// TODO: Write propTypes....
// DataTable.propTypes = {
//   columns: propTypes.node,
//   row: PropTypes.element,
// };

export default DataTable;

import React from 'react';
import { Table } from 'reactstrap';
import { compose, join, filter, complement, isUndefined } from 'lodash/fp';

// Calculate default width from a list of Column React components
const calculateDefaultWidth = (columns) => {
  const sub = compose(
    join(' - '),
    filter(complement(isUndefined)),
  )(React.Children.toArray(columns).map(column => column.props.width));
  return `calc((100%${sub ? `- ${sub}` : ``}) / 3`;
};

const DataTable = ({ resource, basePath, columns, row, ids, data, currentSort, updateSort, language }) => {
  const defaultWidth = calculateDefaultWidth(columns);
  return (
    <Table striped bordered className="data-table">
      <thead>
        <tr>
          {React.Children.toArray(columns).map((column, index) => (
            React.createElement(column.props.header, {
              width: column.props.width || defaultWidth,
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

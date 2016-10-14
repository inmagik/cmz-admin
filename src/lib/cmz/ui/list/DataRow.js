import React, {PropTypes} from 'react';

const DataRow = ({ resource, record, columns, basePath }) => (
  <tr>
    {React.Children.toArray(columns).map((column, index) => (
      <td key={column.props.source || column.props.label || index}>
        <column.props.cell
          basePath={basePath}
          source={column.props.source}
          record={record}
          resource={resource}
        />
      </td>
    ))}
  </tr>
);

DataRow.propTypes = {
};

export default DataRow;

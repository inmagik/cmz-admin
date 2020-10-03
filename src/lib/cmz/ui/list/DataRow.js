import React from 'react';

const DataRow = ({ resource, record, columns, basePath, language }) => (
  <tr>
    {React.Children.toArray(columns).map((column, index) => (
      <td key={column.props.source || column.props.label || index}>
        <column.props.cell
          basePath={basePath}
          source={(language && column.props.translated) ? `translations.${language}.${column.props.source}` : column.props.source}
          record={record}
          resource={resource}
          {...column.props.cellProps}
        />
      </td>
    ))}
  </tr>
);

// TODO: write propTypes...
// DataRow.propTypes = {
// };

export default DataRow;

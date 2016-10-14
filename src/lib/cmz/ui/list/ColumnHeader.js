import React, {PropTypes} from 'react';

const ColumnHeader = ({ label, currentSort, updateSort }) => {

  return <th>{label}</th>;
};

ColumnHeader.propTypes = {
};

export default ColumnHeader;

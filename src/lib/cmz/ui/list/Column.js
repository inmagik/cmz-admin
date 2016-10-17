import React, { PropTypes } from 'react';
import ColumnHeader from './ColumnHeader';
import TextCell from '../cell/TextCell';

const Column = (props) => null;

Column.propTypes = {
  source: PropTypes.string,
  label: PropTypes.string,
  header: PropTypes.any.isRequired,
  cell: PropTypes.any.isRequired,
};

Column.defaultProps = {
  header: ColumnHeader,
  cell: TextCell,
};

export default Column;

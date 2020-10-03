import { PropTypes } from 'react';
import ColumnHeader from './ColumnHeader';
import TextCell from '../cell/TextCell';

// This Component is used only for column configuration...
const Column = (props) => null;

Column.propTypes = {
  source: PropTypes.string,
  label: PropTypes.string,
  header: PropTypes.any.isRequired,
  cell: PropTypes.any.isRequired,
  cellProps: PropTypes.object.isRequired,
  width: PropTypes.string,
};

Column.defaultProps = {
  cellProps: {},
  header: ColumnHeader,
  cell: TextCell,
};

export default Column;

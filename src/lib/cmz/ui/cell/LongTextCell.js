import React, { PropTypes } from 'react';
import { get, truncate } from 'lodash';

const LongTextCell = ({ resource, basePath, source, truncateAt, record = {}, ...passDownProps }) => (
  <div {...passDownProps}>{truncate(get(record, source), { length: truncateAt })}</div>
);

LongTextCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
  truncateAt: PropTypes.number.isRequired,
};

LongTextCell.defaultProps = {
  truncateAt: 100,
}

export default LongTextCell;

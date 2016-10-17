import React, { PropTypes } from 'react';
import { get } from 'lodash';

export const TextCell = ({ resource, basePath, source, record = {}, ...passDownProps }) => (
  <span {...passDownProps}>{get(record, source)}</span>
);

TextCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
};

export default TextCell;

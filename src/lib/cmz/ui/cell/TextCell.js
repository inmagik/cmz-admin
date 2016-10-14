import React, { PropTypes } from 'react';
import { get } from 'lodash';

export const TextCell = ({ source, record = {} }) => (
  <span>{get(record, source)}</span>
);

TextCell.propTypes = {
  source: PropTypes.string.isRequired,
  record: PropTypes.object,
};

export default TextCell;

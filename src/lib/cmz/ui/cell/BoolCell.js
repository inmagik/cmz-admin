import React, { PropTypes } from 'react';
import { get } from 'lodash';

const BoolCell = ({
  record = {},
  resource,
  basePath,
  source,
  x,
  iconTrue,
  iconFalse,
  colorTrue,
  colorFalse,
  ...passDownProps
}) => {
  const bit = get(record, source);
  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <i className={`${bit ? iconTrue : iconFalse} fa-${x}x`} style={{ color: bit ? colorTrue : colorFalse }} />
    </div>
  );
};

BoolCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
  x: PropTypes.number.isRequired,
  iconTrue: PropTypes.string.isRequired,
  iconFalse: PropTypes.string.isRequired,
  colorTrue: PropTypes.string.isRequired,
  colorFalse: PropTypes.string.isRequired,
};

BoolCell.defaultProps = {
  x: 1,
  iconTrue: 'fa fa-check',
  iconFalse: 'fa fa-times',
  colorTrue: 'green',
  colorFalse: 'red',
};

export default BoolCell;

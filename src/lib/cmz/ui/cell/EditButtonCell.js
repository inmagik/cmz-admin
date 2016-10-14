import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'reactstrap';

const EditButtonCell = ({ basePath, record = {} }) => (
  <Button tag={Link} to={`${basePath}/${record.id}`}>Edit</Button>
);

EditButtonCell.propTypes = {
  basePath: PropTypes.string.isRequired,
  record: PropTypes.object,
};

export default EditButtonCell;

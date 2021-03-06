import React, { PropTypes } from 'react';

const Title = ({ title, record }) => {
  if (typeof title === 'string') {
    return <span>{title}</span>;
  }
  return React.createElement(title, { record });
};

Title.propTypes = {
  record: PropTypes.object,
  title: PropTypes.any,
};

export default Title;

import React, { PropTypes } from 'react';
import { get } from 'lodash';

// When there is no image XD
// FIXME: Do it more cool
const NoImage = () => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <div className="img-thumbnail">
      <i className="fa fa-picture-o fa-4x" ></i>
      <div>No Image</div>
    </div>
  </div>
);

const ImageCell = ({ resource, basePath, source, title, alt, record = {}, ...passDownProps }) => {
  const imageUrl = get(record, source);
  const imageTitle = title ? title : imageUrl;
  const altImage = alt ? alt : imageUrl;

  return imageUrl ?
    (<a href={imageUrl} target="_blank">
      <img {...passDownProps} src={imageUrl} className="img-thumbnail" alt={altImage} title={imageTitle} />
    </a>)
    :
    <NoImage />
};

ImageCell.propTypes = {
  resource: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
  source: PropTypes.string,
  record: PropTypes.object,
  title: PropTypes.string,
  alt: PropTypes.string,
};

export default ImageCell;

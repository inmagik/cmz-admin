import React, { PropTypes } from 'react';
import { Card, CardTitle, CardSubtitle, CardBlock } from 'reactstrap';

// https://github.com/reactstrap/reactstrap/blob/master/src/Card.js
const PageContent = (props) => {
  const {
    title,
    subtitle,
    actions,
    children,
    ...attributes
  } = props;

  return (<Card {...attributes} className="content-card">
    {title && (<CardBlock>
      <CardTitle>
        {!actions && title}
        {actions && (<div className="clearfix">
          <div className="pull-xs-left">{title}</div>
          <div className="pull-xs-right">
            {actions}
          </div>
        </div>)}
      </CardTitle>
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </CardBlock>)}
    <CardBlock className="content-card-body">
      {children}
    </CardBlock>
  </Card>);
};

PageContent.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  children: PropTypes.node,
};

export default PageContent;

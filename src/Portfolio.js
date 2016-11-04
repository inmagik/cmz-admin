import React from 'react';
import List from './lib/cmz/ui/list/List';
import Edit from './lib/cmz/ui/detail/Edit';
import Column from './lib/cmz/ui/list/Column';
import { ButtonEditCell } from './lib/cmz/ui/cell';
import { TextField } from './lib/cmz/ui/field';

export const PortfolioList = (props) => (
  <List
    {...props}
    hasCreate={false}
    title="Portfolio"
    resource="portfolioitem"
  >
    <Column label="Author" source="author" />
    <Column cell={ButtonEditCell} />
  </List>
);

const PortfolioTitle = ({ record }) => (
  <span>Portfolio {record ? `"${record.title}"` : ''}</span>
);

export const PortfolioEdit = (props) => (
  <Edit
    {...props}
    title={PortfolioTitle}
    resource="portfolioitem"
  >
    <TextField label="Author" source="author" />
  </Edit>
);

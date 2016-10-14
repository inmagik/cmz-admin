import React from 'react';
import List from './lib/cmz/ui/list/List';
import Edit from './lib/cmz/ui/detail/Edit';
import Column from './lib/cmz/ui/list/Column';
import EditButtonCell from './lib/cmz/ui/cell/EditButtonCell';
import { Link } from 'react-router';

export const PortfolioList = (props) => (
  <List
    {...props}
    title="Portfolio"
    resource="portfolioitem"
  >
    <Column label="Titolo" source="title" />
    <Column label="Body" source="body" />
    <Column cell={EditButtonCell} />
  </List>
);

import { Field } from 'redux-form';
import TextField from './lib/cmz/ui/field/TextField';
import LanguageFields from './lib/cmz/ui/field/LanguageFields';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Fuck That!';
  }
  return errors;
}
const PortfolioTitle = ({ record }) => (
  <span>Portfolio {record ? `"${record.title}"` : ''}</span>
);

export const PortfolioEdit = (props) => (
    <Edit
      {...props}
      validate={validate}
      title={PortfolioTitle}
      resource="portfolioitem"
    >
      <TextField label="Immagine Copertina" source="header_image" type="file" />
      <LanguageFields>
        <TextField label="Title" source="title" type="text" />
      </LanguageFields>
    </Edit>
);

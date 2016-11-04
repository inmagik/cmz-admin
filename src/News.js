import React from 'react';
import List from './lib/cmz/ui/list/List';
import Edit from './lib/cmz/ui/detail/Edit';
import Create from './lib/cmz/ui/detail/Create';
import Column from './lib/cmz/ui/list/Column';
import { ButtonEditCell } from './lib/cmz/ui/cell';
import { TextField, TranslatedFields } from './lib/cmz/ui/field';

export const NewsList = (props) => (
  <List
    {...props}
    translated
    title="News"
    resource="news"
  >
    <Column
      translated
      label="Titolo"
      source="title"
    />
    <Column
      translated
      label="Body"
      source="body"
    />
    <Column cell={ButtonEditCell} />
  </List>
);

// TODO: Implement fallback method to get lang fileds...
const NewsTitle = ({ record }) => (
  <span>News {record ? `"${record.id}"` : ''}</span>
);

export const NewsEdit = (props) => (
  <Edit
    multilang={true}
    {...props}
    // validate={validate}
    title={NewsTitle}
    resource="news"
  >
    <TranslatedFields>
      <TextField label="Title" source="title" type="text" />
      <TextField label="Body YEAH" source="body" type="text" />
    </TranslatedFields>
  </Edit>
);

export const NewsCreate = (props) => (
  <Create
    translated
    {...props}
    title={NewsTitle}
    resource="news"
  >
    <TranslatedFields>
      <TextField label="Title" source="title" type="text" />
      <TextField label="Body" source="body" type="text" />
    </TranslatedFields>
  </Create>
);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,

  Edit,
  Datagrid,
  TextField,
  DateField,
  Filter,
  TextInput,
  LongTextInput,
  EditButton
} from 'admin-on-rest/lib/mui';
import { changeListParams } from 'admin-on-rest/lib/actions/listActions';

const TranslationFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="search" alwaysOn />
  </Filter>
);

class LeTranslationsList extends Component {
  componentWillMount() {
    // default list parameters...
    this.props.changeListParams(this.props.resource, {
      sort: 'date',
      order: 'DESC',
      page: 1,
      perPage: 10,
      filter: {},
    });
  }

  render() {
    return (
      <List {...this.props} filter={TranslationFilter}>
        <Datagrid>
          <TextField label="id" source="id" />
          <TextField label="context" source="context" />
          <TextField label="label" source="label" />
          <TextField label="body" source="body" />
          <EditButton />
        </Datagrid>
      </List>
    );
  }
}

export const TranslationsList = connect(null, {
  changeListParams,
})(LeTranslationsList);

const NewsTitle = ({ record }) => {
  return <span>News {record ? `"${record.title}"` : ''}</span>;
};

export const TranslationsEdit = (props) => (
  <Edit title={NewsTitle} {...props}>
      <TextInput label="label" source="label" />
      <TextInput label="context" source="context" />
      <LongTextInput label="Body" source="body" />
  </Edit>
);
//
// export const PostCreate = (props) => (
//     <Create {...props}>
//         <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
//             <SelectInput optionText="name" />
//         </ReferenceInput>
//         <TextInput label="Title" source="title" />
//         <LongTextInput label="Body" source="body" />
//     </Create>
// );

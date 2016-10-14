import React from 'react';
import List from './lib/cmz/ui/list/List';
import Edit from './lib/cmz/ui/detail/Edit';
import Column from './lib/cmz/ui/list/Column';
import EditButtonCell from './lib/cmz/ui/cell/EditButtonCell';
// import { Button } from 'reactstrap';
import { Link } from 'react-router';
// import SortableList from './lib/cmz/ui/sortablelist/SortableList';
// import { Table } from 'reactstrap';

// const T = ({ children }) => <Table bordered>
//   <thead>
//     <tr>
//       <th>ID</th>
//       <th>Title</th>
//       <th>Body</th>
//     </tr>
//   </thead>
//   <tbody>{children}</tbody>
// </Table>
// var ListItem = React.createClass({
//   displayName: 'SortableListItem',
//   render: function() {
//     return (
//       <div {...this.props} className="list-item">
//         {this.props.record.title}
//       </div>
//     )
//   }
// })
// var SortableListItem = Sortable(ListItem);

// const NewsListItem = (props) => {
//   const { record } = props;
//   return (
//   <tr {...props} style={{ border: '1px solid black' }}>
//     <td>{record.id}</td>
//     <td>{record.title}</td>
//     <td>{record.body}</td>
//   </tr>
// )
// const NewsListItem = ({ record }) => {
//   return (<div>{record.title}</div>)
//   // <ListItem {...props} tag='tr'>
//   //   <div>ID {record.id}</div>
//   //   <div>Title {record.title}</div>
//   //   <div>Body {record.body}</div>
//   // </ListItem>
// // )
// };
//
//
// export const NewsList = (props) => (
//   <SortableList
//     {...props}
//     tag={'div'}
//     title="News"
//     listItem={NewsListItem}
//     resource="news"
//   />
// );

const NewsActionCell = (props) => (
  <div>
    <EditButtonCell {...props} />
    {' '}
    <EditButtonCell {...props} />
  </div>
);

export const NewsList = (props) => (
  <List
    {...props}
    title="News"
    resource="news"
  >
    <Column label="Titolo" source="title" />
    <Column label="Body" source="body" />
    {/* <Column cell={NewsActionCell} /> */}
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
const NewsTitle = ({ record }) => (
  <span>News {record ? `"${record.title}"` : ''}</span>
);

export const NewsEdit = (props) => (
    <Edit
      {...props}
      validate={validate}
      title={NewsTitle}
      resource="news"
    >
      {/* <TextField label="Title" source="title" type="text" />
      <TextField label="Body" source="body" type="text" /> */}
      <LanguageFields>
        <TextField label="Title" source="title" type="text" />
        <TextField label="Body YEAH" source="body" type="text" />
      </LanguageFields>
      {/* <TextField label="Body" source="body" type="text" /> */}
      {/* <TranslatedField>
        <TextField label="Title" source="title" type="text" />
      </TranslatedField> */}
    </Edit>
);

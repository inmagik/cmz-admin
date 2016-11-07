import React from 'react';
import { get, capitalize } from 'lodash';
import List from './../../ui/list/List';
import Column from './../../ui/list/Column';
import { ButtonEditCell, ImageCell, BoolCell, LongTextCell } from './../../ui/cell';

const replicateListProps = (schema) => {
  const resource = get(schema, 'api.uri');
  const title = get(schema, 'resourceSchema.title', capitalize(resource));
  const hasCreate = true;
  return { resource, title, hasCreate };
};

const replicateColumnsProps = (schema) => {
  const properties = get(schema, 'resourceSchema.properties', {});
  return Object.keys(properties).map((source, index) => ({
    source,
    label: source,
    key: index,
  }));
};

export default (schema) => {
  const listProps = replicateListProps(schema);
  const columnsProps = replicateColumnsProps(schema);
  
  return (props) => (
    <List
      {...props}
      {...listProps}
    >
      {columnsProps.map(props => (
        <Column {...props} />
      ))}
    </List>
  );
};

import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';

export const RecordForm = ({ handleSubmit, record, languages, resource, basePath, children }) => (
  <Form onSubmit={handleSubmit}>
    {children && React.Children.map(children, child => (
      React.cloneElement(child, {
        record,
        languages,
        resource,
        basePath,
      })
    ))}
    {/* FIXME: Disable the shitty button while loading */}
    <Button color="success">Save</Button>
  </Form>
);

RecordForm.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func,
  record: PropTypes.object,
  resource: PropTypes.string,
  basePath: PropTypes.string,
};

export default reduxForm({
  form: 'record-form',
})(RecordForm);

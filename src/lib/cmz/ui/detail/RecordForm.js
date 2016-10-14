import React, {PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'reactstrap';

export const RecordForm = ({ handleSubmit, record, resource, basePath, children }) => (
  <Form onSubmit={handleSubmit}>
    {children && React.Children.map(children, child => (
      React.cloneElement(child, {
        record,
        resource,
        basePath,
      })
    ))}
    <Button>Save</Button>
  </Form>
);

RecordForm.propTypes = {
};

export default reduxForm({
  form: 'record-form',
})(RecordForm);

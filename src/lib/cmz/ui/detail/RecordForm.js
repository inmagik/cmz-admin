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
    {/* FIXME: Disable the shitty button while loading */}
    <Button>Save</Button>
  </Form>
);

RecordForm.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func,
  record: PropTypes.object,
  resource: PropTypes.string,
  basePath: PropTypes.string,
  // multilang: PropTypes.bool.isRequired,
  // langs: PropTypes.array,
};

export default reduxForm({
  form: 'record-form',
})(RecordForm);

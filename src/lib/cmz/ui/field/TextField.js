import React, {PropTypes} from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Field } from 'redux-form';

const renderTextField = ({ input, label, record, resource, basePath, language, meta: { touched, error }, ...custom }) => (
  <FormGroup color={(touched && error) ? 'danger' : null}>
    <Label>{label}</Label>
    <Input state={(touched && error) ? 'danger' : null} {...input} {...custom} />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
);

const TextField = ({ source, ...other }) => (
  <Field name={source} component={renderTextField} {...other} />
)

TextField.propTypes = {
};

export default TextField;

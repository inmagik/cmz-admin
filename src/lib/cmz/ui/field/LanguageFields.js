import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';

// TODO: Rename to multilang bro! And refactoring..........
class LanguagesTabs extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.langs.length ? props.langs[0].code : null
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { childrenFields, langs, record, resource, basePath, fields, meta: { error } } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <Nav tabs>
          {langs.map(lang => (
            <NavItem key={lang.code}>
              <NavLink className={classnames({ active: activeTab === lang.code })} onClick={() => this.toggle(lang.code)}>
                {lang.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {fields.map((field, index) => (
            <TabPane tabId={langs[index].code} key={langs[index].code}>
              <Row>
                <Col sm="12" style={{ padding: '1.5em' }}>
                  {childrenFields && React.Children.map(childrenFields, child => {
                    return React.cloneElement(child, {
                      source: `${field}.${child.props.source}`,
                      record: record.langs[index],
                      resource,
                      basePath,
                    })
                  })}
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}
// const renderLanguages = ({ childrenFields, langs, record, resource, basePath, fields, meta: { error } }) => {
//   console.log(fields)
//   return (
//     <div>
      // <Nav tabs>
      //   {langs.map(lang => (
      //     <NavItem key={lang.code}>
      //       <NavLink>{lang.name}</NavLink>
      //     </NavItem>
      //   ))}
      // </Nav>
      // <TabContent activeTab={0}>
      //   {fields.map((field, index) => (
      //     <TabPane tabId={index} key={index}>
      //       {childrenFields && React.Children.map(childrenFields, child => {
      //         return React.cloneElement(child, {
      //           source: `${field}.${child.props.source}`,
      //           record: record.languages[index],
      //           resource,
      //           basePath,
      //         })
      //       })}
      //     </TabPane>
      //   ))}
      // </TabContent>
//     </div>
//   );
// };

const LanguageFields = ({ langs, children, ...other }) => (
  <FieldArray name="langs" childrenFields={children} component={LanguagesTabs} langs={langs} {...other} />
);

LanguageFields.propTypes = {
};

export default LanguageFields;
// export default connect((state) => ({
//   langs: state.cmz.langs,
// }))(LanguageFields);

// import React, {PropTypes} from 'react';
// import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
// import { Field } from 'redux-form';
//
// const renderTextField = ({ input, label, record, resource, basePath, meta: { touched, error }, ...custom }) => (
//   <FormGroup color={(touched && error) ? 'danger' : null}>
//     <Label>{label}</Label>
//     <Input state={(touched && error) ? 'danger' : null} {...input} {...custom} />
//     {touched && error && <FormFeedback>{error}</FormFeedback>}
//   </FormGroup>
// );
//
// const TextField = ({ source, ...other }) => (
//   <Field name={source} component={renderTextField} {...other} />
// );
//
// TextField.propTypes = {
// };
//
// export default TextField;

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { FieldArray, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';

class TranslatedFields extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.languages.length ? props.languages[0].code : null
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
    const { children, languages, record, resource, basePath, translations } = this.props;
    const { activeTab } = this.state;
    console.log(translations)
    return (
      <div>
        <Nav tabs>
          {languages.map(({ code, name }) => (
            <NavItem key={code}>
              <NavLink className={classnames({ active: activeTab === code })} onClick={() => this.toggle(code)}>
                {name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {languages.map(({ code }) => (
            <TabPane tabId={code} key={code}>
              <Row>
                <Col sm="12" style={{ padding: '1.5em' }}>
                  {translations[code] && (
                    <div>
                      <button>Disable!</button>
                      {children && React.Children.map(children, child => (
                        React.cloneElement(child, {
                          source: `translations.${code}.${child.props.source}`,
                          record,
                          resource,
                          basePath,
                        })
                      ))}
                    </div>
                  )}
                  {!translations[code] && (
                    <button>Enable!</button>
                  )}
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}

const selector = formValueSelector('record-form');

// function map

export default connect(state => ({
  languages: state.cmz.languages,
  translations: selector(state, 'translations')
}), {

})(TranslatedFields);

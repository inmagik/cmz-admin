import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { FieldArray, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';

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

  // Check if given translations is enabled by his code
  isTranslationEnabled(code) {
    const { translations } = this.props;
    return !(typeof translations[code] === 'undefined' || translations[code] === null);
  }

  render() {
    const { children, languages, record, resource, basePath } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <Nav tabs>
          {languages.map(({ code, name }) => (
            <NavItem key={code}>
              <NavLink className={classnames({ active: activeTab === code })} onClick={() => this.toggle(code)}>
                {this.isTranslationEnabled(code) && (
                  <Button type="button" color="primary" size="sm"
                    onClick={() => this.props.disableTranslation(code)}>
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </Button>
                )}
                {!this.isTranslationEnabled(code) && (
                  <Button type="button" color="primary" size="sm"
                    onClick={() => this.props.enableTranslation(code)}>
                    <i className="fa fa-check-circle " aria-hidden="true"></i>
                  </Button>
                )}
                {' '}
                <span style={{
                  fontWeight: 'strong',
                  fontSize: '1.3em',
                  textDecoration: this.isTranslationEnabled(code) ? 'none' : 'line-through'
                }}>{name}</span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {languages.map(({ code }) => (
            <TabPane tabId={code} key={code}>
              <Row>
                <Col sm="12" style={{ padding: '1.5em' }}>
                  <div style={this.isTranslationEnabled(code) ? {} : { pointerEvents: 'none', opacity: '0.5' }}>
                    {children && React.Children.map(children, child => (
                      React.cloneElement(child, {
                        source: `translations.${code}.${child.props.source}`,
                        record,
                        resource,
                        basePath,
                      })
                    ))}
                  </div>
                </Col>
              </Row>
            </TabPane>
          ))}
        </TabContent>
      </div>
    );
  }
}

// TODO: In a better universe this component no need to map connect with redux
// instead the required actions may be pass down from RecordForm component directly...
const selector = formValueSelector('record-form');

export default connect(state => ({
  translations: selector(state, 'translations')
}), {
  disableTranslation: (code) => change('record-form', `translations.${code}`, null),
  enableTranslation: (code) => change('record-form', `translations.${code}`, {})
})(TranslatedFields);

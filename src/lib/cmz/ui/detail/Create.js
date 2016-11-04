import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import Title from '../layout/Title';
import PageContent from '../layout/PageContent';
import { crudCreate as crudCreateAction } from '../../actions/dataActions';
import RecordForm from './RecordForm';
import { omitEmptyTranslationsAsNeeded } from '../../util/translations';

class Create extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getBasePath() {
    const { location } = this.props;
    return location.pathname.split('/').slice(0, -1).join('/');
  }

  handleSubmit(record) {
    this.props.crudCreate(this.props.resource, omitEmptyTranslationsAsNeeded(record), this.getBasePath());
  }

  getFormData() {
    const { translated, languages } = this.props;
    // When create is translated enable the first lang as initial form values
    if (translated) {
      if (languages.length > 0) {
        return {
          translations: {
            [languages[0].code]: {}
          }
        };
      }
      return { translations: {} }
    }

    return {};
  }

  render() {
    const { title, children, isLoading, resource, validation, languages } = this.props;
    const basePath = this.getBasePath();
    const data = this.getFormData();

    return (
      <PageContent title={<Title title={title} />} actions={(
        <div>
          <Button tag={Link} to={basePath}><i className="fa fa-list" aria-hidden="true"></i></Button>
        </div>
      )}>
        <RecordForm
          languages={languages}
          onSubmit={this.handleSubmit}
          record={data}
          initialValues={data}
          resource={resource}
          basePath={basePath}
        >
          {children}
        </RecordForm>
      </PageContent>
    );
  }
}

Create.propTypes = {
  children: PropTypes.node,
  crudCreate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.any,
  validation: PropTypes.func,
  translated: PropTypes.bool.isRequired,
  languages: PropTypes.array,
};

Create.defaultProps = {
  translated: false,
};

function mapStateToProps(state, props) {
  return {
    isLoading: state.cmz.loading > 0,
    languages: state.cmz.languages
  };
}

export default connect(
  mapStateToProps,
  { crudCreate: crudCreateAction },
)(Create);

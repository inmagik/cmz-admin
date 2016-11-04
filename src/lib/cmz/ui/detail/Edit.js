import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import { getRecord } from '../../reducer/resource/data';
import PageContent from '../layout/PageContent';
import Title from '../layout/Title';
import { crudGetOne as crudGetOneAction, crudUpdate as crudUpdateAction } from '../../actions/dataActions';
import { unloadEdit } from '../../actions/editActions';
import RecordForm from './RecordForm';
import { omitEmptyTranslationsAsNeeded } from '../../util/translations';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.crudGetOne(this.props.resource, this.props.id, this.getBasePath());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.crudGetOne(nextProps.resource, nextProps.id, this.getBasePath());
    }
  }

  getBasePath() {
    const { location } = this.props;
    return location.pathname.split('/').slice(0, -1).join('/');
  }

  componentWillUnmount() {
    this.props.unloadEdit();
  }

  handleSubmit(record) {
    this.props.crudUpdate(this.props.resource, this.props.id, omitEmptyTranslationsAsNeeded(record), this.getBasePath());
  }

  render() {
    const { title, children, id, isLoading, resource, hasDelete, validate, languages, data } = this.props;
    const basePath = this.getBasePath();
    console.log(data)

    return (
      <PageContent title={<Title title={title} record={data} />} actions={(
        <div>
          <Button tag={Link} to={basePath}><i className="fa fa-list" aria-hidden="true"></i></Button>
       </div>
      )}>
        {data && <RecordForm
          languages={languages}
          onSubmit={this.handleSubmit}
          record={data}
          initialValues={data}
          resource={resource}
          basePath={basePath}
          validate={validate}
        >
          {children}
        </RecordForm>}
      </PageContent>
    );
  }
}

Edit.propTypes = {
  children: PropTypes.node,
  crudGetOne: PropTypes.func.isRequired,
  crudUpdate: PropTypes.func.isRequired,
  data: PropTypes.object,
  // hasDelete: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.any,
  translated: PropTypes.bool.isRequired,
  languages: PropTypes.array,
};

Edit.defaultProps = {
  translated: false,
};

function mapStateToProps(state, props) {
  const sync = state.cmz[props.resource].edit.sync;
  const resourceState = state.cmz[props.resource];

  // Data is valid only when is synched!
  const data = sync ? getRecord(resourceState.data, props.params.id) : null;

  return {
    data,
    id: props.params.id,
    languages: state.cmz.languages,
    isLoading: state.cmz.loading > 0
  };
}

export default connect(
  mapStateToProps,
  { crudGetOne: crudGetOneAction, crudUpdate: crudUpdateAction, unloadEdit },
)(Edit);

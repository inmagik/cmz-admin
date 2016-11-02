import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
// TODO: Better import...
import { mapMultilangRecord, normalizeMultilangRecord, getRecord } from '../../reducer/resource/data';
import PageContent from '../layout/PageContent';
import Title from '../layout/Title';
import { crudGetOne as crudGetOneAction, crudUpdate as crudUpdateAction } from '../../actions/dataActions';
import { unloadEdit } from '../../actions/editActions';
import RecordForm from './RecordForm';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.crudGetOne(this.props.resource, this.props.id, this.getBasePath(), this.getLangCodes());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.crudGetOne(nextProps.resource, nextProps.id, this.getBasePath(), this.getLangCodes());
    }
  }

  getBasePath() {
    const { location } = this.props;
    return location.pathname.split('/').slice(0, -1).join('/');
  }

  getLangCodes() {
    const { multilang, langs } = this.props;
    if (multilang) {
      return langs.map(({ code }) => code);
    }
    // No need langs
    return undefined;
  }

  componentWillUnmount() {
    this.props.unloadEdit();
  }

  handleSubmit(record) {
    const { multilang, langs } = this.props;
    const normalizedRecord = multilang ? normalizeMultilangRecord(record, langs) : record;
    this.props.crudUpdate(this.props.resource, this.props.id, normalizedRecord, this.getBasePath(), this.getLangCodes());
  }

  render() {
    const { showForm, title, children, id, data, isLoading, resource, hasDelete, validate, langs, multilang } = this.props;
    const basePath = this.getBasePath();
    // console.info(data)

    return (
      <PageContent title={<Title title={title} record={data} />} actions={(
        <div>
          <Button tag={Link} to={basePath}><i className="fa fa-list" aria-hidden="true"></i></Button>
       </div>
      )}>
        {showForm && data && <RecordForm
          langs={langs}
          multilang={multilang}
          onSubmit={this.handleSubmit}
          record={data}
          resource={resource}
          basePath={basePath}
          initialValues={data}
          validate={validate}
        >
          {children}
        </RecordForm>}
      </PageContent>
    );
  }
}

Edit.defaultProps = {
  multilang: false,
};

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
  showForm: PropTypes.bool.isRequired,
  multilang: PropTypes.bool.isRequired,
  langs: PropTypes.array,
};

function mapStateToProps(state, props) {
  const sync = state.cmz[props.resource].edit.sync;
  const langs = state.cmz.langs;
  const resourceState = state.cmz[props.resource];

  // When data arrived and multilang is enable map record for view
  let data = getRecord(resourceState.data, props.params.id);
  if (props.multilang && data) {
    data = mapMultilangRecord(data, langs);
  }

  return {
    langs,
    data,
    showForm: sync, // Sync means we have last version of data retrieve id lookup
    id: props.params.id,
    isLoading: state.cmz.loading > 0,
  };
}

export default connect(
  mapStateToProps,
  { crudGetOne: crudGetOneAction, crudUpdate: crudUpdateAction, unloadEdit },
)(Edit);

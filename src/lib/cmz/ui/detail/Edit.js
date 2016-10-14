import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import PageContent from '../layout/PageContent';
import Title from '../layout/Title';
import { crudGetOne as crudGetOneAction, crudUpdate as crudUpdateAction } from '../../actions/dataActions';
import RecordForm from './RecordForm';

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

  handleSubmit(record) {
    this.props.crudUpdate(this.props.resource, this.props.id, record, this.getBasePath());
  }

  render() {
    const { title, children, id, data, isLoading, resource, hasDelete, validate } = this.props;
    const basePath = this.getBasePath();

    return (
      <PageContent title={<Title title={title} record={data} />} actions={(
        <div>
          <Button tag={Link} to={basePath}><i className="fa fa-list" aria-hidden="true"></i></Button>
       </div>
      )}>
        {data && data.languages && <RecordForm
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
};

function mapStateToProps(state, props) {
  return {
    id: props.params.id,
    data: state.cmz[props.resource].data[props.params.id],
    isLoading: state.cmz.loading > 0,
  };
}

export default connect(
  mapStateToProps,
  { crudGetOne: crudGetOneAction, crudUpdate: crudUpdateAction },
)(Edit);

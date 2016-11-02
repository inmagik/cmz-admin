import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'reactstrap';
import Title from '../layout/Title';
import PageContent from '../layout/PageContent';
import { crudCreate as crudCreateAction } from '../../actions/dataActions';
import RecordForm from './RecordForm';
// import { mapMultilangRecord, normalizeMultilangRecord } from '../../reducer/resource/data';

class Create extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(record) {
    this.props.crudCreate(this.props.resource, record, this.getBasePath());
    console.log(record);
    // const { multilang, langs } = this.props;
    // // console.log(record)
    // const normalizedRecord = multilang ? normalizeMultilangRecord(record, langs) : record;
    // // mapMultilangRecord();
    // // console.log(normalizedRecord)
  }

  render() {
      const { title, children, isLoading, resource, validation, multilang, langs, data } = this.props;
        const basePath = this.getBasePath();

    return (
      <PageContent title={<Title title={title} />} actions={(
        <div>
          <Button tag={Link} to={basePath}><i className="fa fa-list" aria-hidden="true"></i></Button>
       </div>
      )}>
        <RecordForm
          langs={langs}
           // multilang={multilang}
          onSubmit={this.handleSubmit}
          record={data}
          initialValues={{
            translations: {
              en: {}
            }
          }}
          resource={resource}
          basePath={basePath}
        >
          {children}
        </RecordForm>
      </PageContent>
    );
        // return (
        //     <Card style={{ margin: '2em', opacity: isLoading ? 0.8 : 1 }}>
        //         <CardActions style={{ zIndex: 2, display: 'inline-block', float: 'right' }}>
        //             <ListButton basePath={basePath} />
        //         </CardActions>
        //         <CardTitle title={<Title title={title} defaultTitle={`Create ${inflection.humanize(inflection.singularize(resource))}`} />} />
        //         <RecordForm
        //             onSubmit={this.handleSubmit}
        //             resource={resource}
        //             basePath={basePath}
        //             validation={validation}
        //             record={{}}
        //         >
        //             {children}
        //         </RecordForm>
        //     </Card>
        // );
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
  //   multilang: PropTypes.bool.isRequired,
  // langs: PropTypes.array,
};

Create.defaultProps = {
    data: {},
};

function mapStateToProps(state, props) {
  // const langs = state.cmz.langs;
  // let data = props.multilang ? mapMultilangRecord({}, langs) : {}
    return {
        // langs,
        // data,
        isLoading: state.cmz.loading > 0,
    };
}

export default connect(
    mapStateToProps,
    { crudCreate: crudCreateAction },
)(Create);

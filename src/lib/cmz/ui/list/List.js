import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { debounce, omit } from 'lodash';
import {
  Button,
  // ButtonDropdown,
  // DropdownToggle,
  // DropdownItem,
  // DropdownMenu,
  Row,
  Col
} from 'reactstrap';
import Title from '../layout/Title';
import PageContent from '../layout/PageContent';
import DataTable from './DataTable';
import DataRow from './DataRow';
import Paginator from './Paginator';
import LanguageSwitcher from './LanguageSwitcher';
import queryReducer, { SET_SORT, SET_PAGE, SET_FILTER, SET_LANGUAGE } from '../../reducer/resource/list/queryReducer';
import { crudGetList as crudGetListAction } from '../../actions/dataActions';
import { changeListParams as changeListParamsAction } from '../../actions/listActions';

export class List extends Component {
  constructor(props) {
    super(props);
    this.debouncedSetFilters = debounce(this.setFilters.bind(this), 500);
    this.state = {};
  }

  componentDidMount() {
    this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resource !== this.props.resource
     || nextProps.query.sort !== this.props.query.sort
     || nextProps.query.order !== this.props.query.order
     || nextProps.query.page !== this.props.query.page
     || nextProps.query.language !== this.props.query.language
     || nextProps.query.filter !== this.props.query.filter) {
        this.updateData(this.mapQuery((Object.keys(nextProps.query).length) > 0 ? nextProps.query : nextProps.params));
    }
    if (nextProps.filters !== this.props.filters) {
      const nextFilters = nextProps.filters;
      Object.keys(nextFilters).forEach(filterName => {
        if (nextFilters[filterName] === '') {
          // remove empty filter from query
          delete nextFilters[filterName];
        }
      });
      this.debouncedSetFilters(nextFilters);
    }
  }

  getBasePath() {
    return this.props.location.pathname;
  }

  refresh = (event) => {
    event.stopPropagation();
    this.updateData();
  }

  getQuery() {
    return this.mapQuery((Object.keys(this.props.query).length > 0) ? this.props.query : { ...this.props.params });
  }

  // Map query both in url and in rest call...
  mapQuery(query) {
    // FIXME: Maybe even translated and other options can be passed as args...
    // Translated can change in nextProps... for example
    if (!this.props.translated) {
      return omit(query, ['language']);
    }
    return query;
  }

  updateData(query) {
    const { sort, order, page, perPage, filter, language } = query || this.getQuery();
    this.props.crudGetList(this.props.resource, { page, perPage }, { field: sort, order }, filter, language);
  }

  updateSort = (event) => {
    event.stopPropagation();
    this.changeParams({ type: SET_SORT, payload: event.currentTarget.dataset.sort });
  }

  setPage = (page) => this.changeParams({ type: SET_PAGE, payload: page });

  switchLanguage = (language) => this.changeParams({ type: SET_LANGUAGE, payload: language });

  setFilters = (filters) => {
    this.changeParams({ type: SET_FILTER, payload: filters });
  }

  showFilter = (filterName) => this.setState({ [filterName]: true });

  hideFilter = (filterName) => {
    this.setState({ [filterName]: false });
    this.setFilters({ ...this.props.filters, [filterName]: undefined });
  }

  changeParams(action) {
    let newParams = queryReducer(this.getQuery(), action);
    this.props.push({ ...this.props.location, query: { ...newParams, filter: JSON.stringify(newParams.filter) } });
    this.props.changeListParams(this.props.resource, newParams);
  }

  render() {
    const { title, resource, ids, data, children, row, total, translated, languages, hasCreate } = this.props;
    const query = this.getQuery();
    const basePath = this.getBasePath();

    return (
      <PageContent title={<Title title={title} />} actions={(
        <div>
          {/*
            TODO: Use sass or other shitty stuff to do a primary color custom for cmz
            with deepskyblue
          */}
          {/* TODO: Implement filters
            <ButtonDropdown color="secondary" isOpen={true} toggle={() => {}}>
            <DropdownToggle caret>Add Filter</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Titolo</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>{' '} */}
          {hasCreate && (<span>
            <Button tag={Link} to={`${basePath}/create`} color="secondary"><i className="fa fa-plus" /> Create</Button>
            {' '}
          </span>)}
          <Button color="secondary" onClick={this.refresh}><i className="fa fa-refresh" /> Refresh</Button>
        </div>
      )}>
        <Row style={{ paddingBottom: '0.5em' }}>
          <Col md={2}>
            {translated && (
              <LanguageSwitcher
                selectedLanguage={query.language}
                onLanguageSwitched={this.switchLanguage}
                languages={languages}
              />
            )}
          </Col>
        </Row>
        <DataTable
          language={translated && query.language}
          resource={resource}
          basePath={basePath}
          columns={children}
          row={row}
          ids={ids}
          data={data}
          currentSort={query}
          updateSort={this.updateSort}
        />
        <Paginator
          resource={resource}
          page={parseInt(query.page, 10)}
          perPage={parseInt(query.perPage, 10)}
          total={total}
          setPage={this.setPage}
        />
      </PageContent>
    );
  }
}

List.propTypes = {
  title: PropTypes.any,
  // TODO: Implement filters
  // filter: PropTypes.oneOfType([
  //     PropTypes.func,
  //     PropTypes.string,
  // ]),
  // filters: PropTypes.object,
  resource: PropTypes.string.isRequired,
  translated: PropTypes.bool.isRequired,
  languages: PropTypes.array,
  hasCreate: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  path: PropTypes.string,
  params: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  ids: PropTypes.array,
  total: PropTypes.number.isRequired,
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  crudGetList: PropTypes.func.isRequired,
  changeListParams: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  push: PropTypes.func.isRequired,
};

List.defaultProps = {
  row: DataRow,
  translated: false,
  hasCreate: true,
  filters: {},
};

function mapStateToProps(state, props) {
  const resourceState = state.cmz[props.resource];
  const query = props.location.query;
  if (query.filter && typeof query.filter === 'string') {
    query.filter = JSON.parse(query.filter);
  }

  return {
    query,
    params: resourceState.list.params,
    ids: resourceState.list.ids,
    total: resourceState.list.total,
    data: resourceState.data,
    isLoading: state.cmz.loading > 0,
    languages: state.cmz.languages
    // TODO: Implement filters
    // filters: getFormValues('filterForm')(state) || resourceState.list.params.filter,
  };
}

export default connect(
  mapStateToProps,
  {
    crudGetList: crudGetListAction,
    changeListParams: changeListParamsAction,
    push: pushAction,
  },
)(List);

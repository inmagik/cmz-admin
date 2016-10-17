import React, { Component, PropTypes } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export class Paginator extends Component {
  constructor(props) {
    super(props);
    this.gotoPage = this.gotoPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  range() {
    const input = [];
    const { page, perPage, total } = this.props;
    const nbPages = Math.ceil(total / perPage) || 1;

    // display page links around the current page
    if (page > 2) {
      input.push('1');
    }
    if (page === 4) {
      input.push('2');
    }
    if (page > 4) {
      input.push('.');
    }
    if (page > 1) {
      input.push(page - 1);
    }
    input.push(page);
    if (page < nbPages) {
      input.push(page + 1);
    }
    if (page === (nbPages - 3)) {
      input.push(nbPages - 1);
    }
    if (page < (nbPages - 3)) {
      input.push('.');
    }
    if (page < (nbPages - 1)) {
      input.push(nbPages);
    }

    return input;
  }

  getNbPages() {
    return Math.ceil(this.props.total / this.props.perPage) || 1;
  }

  prevPage(event) {
    event.stopPropagation();
    if (this.props.page === 1) {
      throw new Error('Cannot go before page 1');
    }
    this.props.setPage(this.props.page - 1);
  }

  nextPage(event) {
    event.stopPropagation();
    if (this.props.page > this.getNbPages()) {
      throw new Error('Cannot after last page');
    }
    this.props.setPage(this.props.page + 1);
  }

  gotoPage(event) {
    event.stopPropagation();
    const page = event.currentTarget.dataset.page;
    if (page < 1 || page > this.getNbPages()) {
      throw new Error(`Page number ${page} out of boundaries`);
    }
    this.props.setPage(page);
  }

  renderPageNums() {
    const { page: currentPageNum } = this.props;
    return this.range().map(pageNum =>
      (pageNum === '.') ?
        <PaginationItem>
          <PaginationLink tag='button'>&hellip;</PaginationLink>
        </PaginationItem>
        :
        <PaginationItem active={pageNum === currentPageNum}>
          <PaginationLink tag='button' onClick={this.gotoPage} data-page={pageNum}>{pageNum}</PaginationLink>
        </PaginationItem>
    );
  }

  render() {
    const { page, perPage, total } = this.props;
    if (total === 0) return null;
    const offsetEnd = Math.min(page * perPage, total);
    const offsetBegin = Math.min((page - 1) * perPage + 1, offsetEnd);
    const nbPages = this.getNbPages();

    return (
      <div className="clearfix">
        <div className="pull-left">
          <span>{offsetBegin}-{offsetEnd} of {total}</span>
        </div>
        <div className="pull-right">
          {nbPages > 1 &&
            <Pagination style={{ margin: 0 }}>
              {page > 1 &&
                <PaginationItem>
                  <PaginationLink previous tag='button' onClick={this.prevPage} />
                </PaginationItem>
              }
              {this.renderPageNums()}
              {page !== nbPages &&
                <PaginationItem>
                  <PaginationLink next tag='button' onClick={this.nextPage} />
                </PaginationItem>
               }
            </Pagination>
          }
        </div>
      </div>
    );
  }
}

Paginator.propTypes = {
  resource: PropTypes.string.isRequired,
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func.isRequired,
};

export default Paginator;

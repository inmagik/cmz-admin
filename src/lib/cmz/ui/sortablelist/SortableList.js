import React, { Component, PropTypes} from 'react';
import { Sortable } from 'react-sortable';
import { connect } from 'react-redux';
import PageContent from '../layout/PageContent';
import { sortableGetList } from '../../actions/dataActions';
import { updateSort } from '../../actions/sortActions';

const NewsListItem = (props) => {
  const { record } = props;
  return (
    <div style={{ border: '1px solid black' }}>
      <div>ID {record.id}</div>
      <div>Title {record.title}</div>
      <div>Body {record.body}</div>
    </div>
  );
};
const ListItem = (props) => {
    return <NewsListItem {...props} record={{title:'X',id:2,body:'o'}}></NewsListItem>;
    // return (
    //   <div {...props}>{props.children}</div>
    // )
};


const SortableListItem = Sortable(ListItem);

class SortableList extends Component {
  constructor(props) {
    super(props)
    this.updateState = this.updateState.bind(this);
    this.state = {
      draggingIndex: null,
      data: {
        items:[]
      }
    }
  }

  componentDidMount() {
      this.props.sortableGetList(this.props.resource);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ids !== this.props.ids) {
      // Never share instance!
      this.setState({ data: { items: nextProps.ids.map(id => id) }});
    }
  }

  updateState(sortState) {
    const { isLoading, updateSort, resource } = this.props;

    // No update sort state while is saving sorting
    // if (isLoading) {
    //   return;
    // }

    // Drag end, time to update sort in store!
    if (sortState.draggingIndex === null) {
      // Never share instance!
      this.props.updateSort(resource, { ids: this.state.data.items.map(id => id) });
    }

    // Update internal sort state
    this.setState(sortState);
  }

  render() {
    const { data, isLoading, title } = this.props;

    const listItems = this.state.data.items.map((id, i) => (
      <SortableListItem
        key={id}
        updateState={this.updateState}
        items={this.state.data.items}
        draggingIndex={this.state.draggingIndex}
        sortId={i}
        outline="list"
      />
    ));

    return (
      <PageContent title={title}>
        <this.props.tag style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>{listItems}</this.props.tag>
      </PageContent>
    );
  }
}

SortableList.propTypes = {
};

function mapStateToProps(state, props) {
  const resourceState = state.cmz[props.resource];
  // const SortableListItem = Sortable(props.listItem);
  const SortableListItem = Sortable(props.listItem);

  return {
    isLoading: state.cmz.loading > 0,
    listItem: SortableListItem,
    ids: resourceState.sortablelist.ids,
    data: resourceState.data,
  };
}

export default connect(mapStateToProps, {
  sortableGetList,
  updateSort,
})(SortableList);

import { SORTABLE_GET_LIST_SUCCESS } from '../../../actions/dataActions';
import {
  SORTABLE_UPDATE_SORT_SUCCESS,
  SORTABLE_UPDATE_SORT_FAILURE
} from '../../../actions/sortActions';

export default (resource) => (previousState = [], { type, payload, meta }) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }
    switch (type) {
    case SORTABLE_UPDATE_SORT_SUCCESS:
        return payload.ids.map(id => id);
    case SORTABLE_GET_LIST_SUCCESS:
        return payload.data.map(record => record.id);
    case SORTABLE_UPDATE_SORT_FAILURE:
        // Back to preovious order, change array instance make props change...
        return previousState.map(id => id);
    default:
        return previousState;
    }
};

export const getIds = (state) => state;

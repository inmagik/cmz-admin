import {
  UPDATE_SORT,
} from '../rest/types';

export const SORTABLE_UPDATE_SORT = 'SORTABLE_UPDATE_SORT';
export const SORTABLE_UPDATE_SORT_LOADING = 'SORTABLE_UPDATE_SORT_LOADING';
export const SORTABLE_UPDATE_SORT_FAILURE = 'SORTABLE_UPDATE_SORT_FAILURE';
export const SORTABLE_UPDATE_SORT_SUCCESS = 'SORTABLE_UPDATE_SORT_SUCCESS';

export const updateSort = (resource, ids) => ({
  type: SORTABLE_UPDATE_SORT,
  payload: { ids },
  meta: { resource, fetch: UPDATE_SORT, cancelPrevious: true },
});

export const EDIT_UNLOADED = 'EDIT_UNLOADED';

export const unloadEdit = (resource) => ({
  type: EDIT_UNLOADED,
  meta: { resource }
});

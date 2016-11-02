import React, {PropTypes} from 'react';


{/* <ActionCell */}

// class ActionCell extends React.Component {
//   render() {
//     return (<div>MyComponent</div>);
//   }
// }
//
// ActionCell.propTypes = {
// };

data = record + state
query = record + state
const CRUD_OPERATION;
const doAction = () =>
  action(crudOperationOne, resource, id, record, select(state));
React.createElement(this.props.cell, {
  doAction,
})

<ActionCell
  select={state => state.cmz.auth.user}
  action={() =>}
  {...props}
  cell={(props) => <Button onClick={() => pros.doAction()} />}
/>
const doAwesomeStuff = (crudOperationOne, resource, id, record, state) => {

  crudOperationOne(resource, CRUD_GET_ONE, id);
  crudOperationOne(resource, CRUD_UPDATE, id, {
    data: {
      ...record,
      id: record.id + 1,
    }
  });
}

const crudOperationOne = (resource, fetch, id, additionPayload = {}) => ({
  type: CRUD_OPERATION_ONE,
  payload: { id, ...additionPayload },
  meta: { resource, fetch, cancelPrevious: false }
});

// const A = () => (
//   <ActionCell
//     select={state => ({ user: state.cmz.auth.user })}
//   />
// )
//
// CRUD_ACTION
// CRUD_GET_LIST_LOADING
//
// export const crudAction = (resource, id, data) =
//
// export const crudUpdate = (resource, id, data, basePath) => ({
//     type: CRUD_UPDATE,
//     payload: { id, data, basePath },
//     meta: { resource, fetch: UPDATE, cancelPrevious: true },
// });
// export const crudGetOne = (resource, id, basePath, cancelPrevious = true) => ({
//     type: CRUD_GET_ONE,
//     payload: { id, basePath },
//     meta: { resource, fetch: GET_ONE, cancelPrevious },
// });
//
// export const crudAction = (resource, pagination, sort, filter, lang) => ({
//   type: CRUD_GET_LIST,
//   payload: { pagination, sort, filter, lang },
//   meta: { resource, fetch: GET_LIST, cancelPrevious: false },
// });
//
// export const crudGetList = (resource, pagination, sort, filter, lang) => ({
//   type: CRUD_GET_LIST,
//   payload: { pagination, sort, filter, lang },
//   meta: { resource, fetch: GET_LIST, cancelPrevious: false },
// });
// //function mapDispatchToProps(dispatch, ownProps) {
// //
// //
// //
// //}
//
// // export default connect(mapStateToProps, mapDispatchToProps)

import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.cmz.auth.user,
  authenticatingSelector: state => state.cmz.auth.authenticatingWithToken,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.cmz.auth,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  // Want to redirect the user when they are done loading and authenticated
  predicate: auth => auth.user === null && auth.authenticatingWithToken === false,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  allowRedirectBack: false
});

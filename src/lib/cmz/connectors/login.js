import { connect } from 'react-redux';
import { login } from '../../auth/actions';

export default (WrappedComponent) => connect((state) => ({ ...state.cmz.auth }), {
  login,
})(WrappedComponent);

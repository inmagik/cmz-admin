import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

export default (WrappedComponent) => connect((state) => ({ ...state.auth }), {
  login,
})(WrappedComponent);

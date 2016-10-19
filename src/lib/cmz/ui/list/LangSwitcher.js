import React, { PropTypes } from 'react';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';

const LangSwitcher = ({ langs, currentLang, onLangSwitched }) => (
  <Input type="select" onChange={e => onLangSwitched(e.target.value)} value={currentLang}>
    {langs.map(({ code, name }) => (
      <option key={code} value={code}>{name}</option>
    ))}
  </Input>
)

LangSwitcher.propTypes = {
  currentLang: PropTypes.string.isRequired,
  onLangSwitched: PropTypes.func.isRequired,
};

export default connect((state) => ({
  langs: state.cmz.langs,
}))(LangSwitcher);

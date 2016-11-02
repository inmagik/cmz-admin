import React, { PropTypes } from 'react';
import { Input } from 'reactstrap';

const LanguageSwitcher = ({ languages, selectedLanguage, onLanguageSwitched }) => (
  <Input type="select" onChange={e => onLanguageSwitched(e.target.value)} value={selectedLanguage}>
    {languages.map(({ code, name }) => (
      <option key={code} value={code}>{name}</option>
    ))}
  </Input>
);

LanguageSwitcher.propTypes = {
  languages: PropTypes.array.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  onLanguageSwitched: PropTypes.func.isRequired,
};

export default LanguageSwitcher;

import { omitBy } from 'lodash';

// Omit empty translations keys from record
export const omitEmptyTranslationsAsNeeded = (record) => {
  // No translations return original object
  if (typeof record.translations === 'undefined') {
    return record;
  }
  // Omit empty keys
  return {
    ...record,
    translations: omitBy(record.translations, t => typeof t === 'undefined' || t === null)
  };
};

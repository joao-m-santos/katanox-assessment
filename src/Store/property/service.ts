import data from '../../data.json';

import type { IPropertyObject } from './types';

export const getPropertiesService = async () => {
  return (
    fetch('./data.json')
      .then(() => {
        const properties = data.data;
        return properties as Array<IPropertyObject>;
      })
      // TODO: Handle errors
      .catch((error) => [] as Array<IPropertyObject>)
  );
};

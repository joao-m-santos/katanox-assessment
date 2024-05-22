import type { RootState } from '../store';

export const getPropertiesSelector = (state: RootState) => state.property.properties;

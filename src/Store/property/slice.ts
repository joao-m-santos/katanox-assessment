import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { IPropertyObject, PropertyState } from './types';

export const PROPERTY_SLICE_NAME = 'property';

const propertyInitialState: PropertyState = {
  properties: {
    data: null,
    isLoading: false,
  },
};

export const propertySlice = createSlice({
  name: PROPERTY_SLICE_NAME,
  initialState: propertyInitialState,
  reducers: {
    getProperties: (state) => {
      state.properties.isLoading = true;
    },
    getPropertiesSuccess: (state, { payload }: PayloadAction<Array<IPropertyObject>>) => {
      state.properties.data = payload;
      state.properties.isLoading = false;
    },
    // TODO: Handle request errors
  },
});

export const { getProperties, getPropertiesSuccess } = propertySlice.actions;
export const GET_PROPERTIES_ACTION = getProperties.type;

export default propertySlice.reducer;

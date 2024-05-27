import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  IPropertyCancellationPolicy,
  IPropertyObject,
  PropertyState,
  SetPropertyActionPayload,
} from './types';

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
    /* Fetches the property list (see `getPropertiesSaga`) */
    getProperties: (state) => {
      state.properties.isLoading = true;
    },
    /* Updates the property list with results from fetch success */
    getPropertiesSuccess: (state, { payload }: PayloadAction<Array<IPropertyObject>>) => {
      state.properties.data = payload;
      state.properties.isLoading = false;
    },
    // TODO: Handle request errors

    /* Updates a policy entry of a specific property */
    setPropertyPolicies: (state, { payload }: PayloadAction<SetPropertyActionPayload>) => {
      const property = (state.properties.data as Array<IPropertyObject>).find(
        (item) => item.property.id === payload.propertyId
      );

      if (property) {
        property.policies[payload.policyType] = property.policies[payload.policyType].map(
          (policy) => {
            if (policy.id === payload.policyData.id) return payload.policyData;
            return policy;
          }
        ) as Array<IPropertyCancellationPolicy>;
      }

      // TODO: Handle errors
      // TODO: Save on backend
    },
  },
});

export const { getProperties, getPropertiesSuccess, setPropertyPolicies } = propertySlice.actions;
export const GET_PROPERTIES_ACTION = getProperties.type;

export default propertySlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coords: null,
  positionAge: null,
};

const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload.coords;
      state.positionAge = action.payload.positionAge; 
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;

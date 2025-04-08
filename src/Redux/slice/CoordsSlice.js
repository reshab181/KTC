import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coords: null,
};

const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;

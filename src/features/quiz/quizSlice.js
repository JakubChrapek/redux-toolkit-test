import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [
      { content: "How to start with Redis?" },
      { content: "How to start with Firebase?" },
    ]
  },
  reducers: {

  },
});

export default slice.reducer;
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      isLogin: false,
      userData: {}
    }
  },
  reducers: {
    signIn: (state, data) => {
      state.value.isLogin = true
      state.value.userData = data.payload
    },
    signOut: (state) => {
      state.value.isLogin = false
      state.value.userData = {}
    }
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer
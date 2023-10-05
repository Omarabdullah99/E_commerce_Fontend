import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { fetchLoggedInUserOrderSide, fetchLoggedInUserOrders, } from './userApi';

const initialState = {
    status: 'idle',
    userOrders:[],
    userInfo:null
  };

  export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async (userId) => {
      const response = await fetchLoggedInUserOrders(userId);
      // The value we return becomes the `fulfilled` action payload
      console.log("userSlice",response)
      return response.data;
    }
  );

  // export const updateUserAsync = createAsyncThunk(
  //   'user/updateUserAsync',
  //   async (id) => {
  //     const response = await updateUser(id);
  //     // The value we return becomes the `fulfilled` action payload
  //     return response.data;
  //   }
  // );

  export const fetchLoggedInUserOrderSideAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrderSide',
    async (userId) => {
      const response = await fetchLoggedInUserOrderSide(userId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.userOrders = action.payload
        })
      //   .addCase(updateUserAsync.pending,(state)=>{
      //     state.status='loading'
      // })
      // .addCase(updateUserAsync.fulfilled,(state,action)=>{
      //     state.status='idle';
      //     state.userOrders = action.payload
      // })
      .addCase(fetchLoggedInUserOrderSideAsync.pending,(state)=>{
        state.status='loading'
    })
    .addCase(fetchLoggedInUserOrderSideAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.userInfo = action.payload
    })    

    }
  })
  export const selectedUserOrders=(state)=> state.user.userOrders
  export const selectedUserInfo=(state)=> state.user.userInfo
  export default userSlice.reducer
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { checkeUser, createUser} from './authAPI'
import { updateUser } from '../user/userApi';


const initialState = {
    loggedInUser: null,
    status: 'idle',
    error:null,
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
//*updateUserAsync function linkup Cheout personal information form 
  export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update) => {
      const response = await updateUser(update);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  //!note checkUserAsync codedosth convert logiUserAsync
  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await checkeUser(loginInfo);
      return response.data;
      
    } catch (error) {
      console.log('authslicelogin',error)
      return rejectWithValue(error)
      
    }
    }
  );

 


  export const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
      setUser:(state,action)=>{
        state.loggedInUser=action.payload
      },

      //!logout action
      setLogout: (state, action) => {
        localStorage.clear()
        state.loggedInUser = null;
      },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status='idle';
            localStorage.setItem('ecommerce', JSON.stringify({...action.payload}))
            state.loggedInUser=action.payload
        })
        .addCase(checkUserAsync.pending,(state)=>{
          state.status='loading'
      })
      .addCase(checkUserAsync.fulfilled,(state,action)=>{
          state.status='idle';
          localStorage.setItem('ecommerce', JSON.stringify({...action.payload}))
          state.loggedInUser=action.payload
      })
      .addCase(checkUserAsync.rejected,(state,action)=>{
        state.status='idle';
        state.error=action.payload
    })
    .addCase( updateUserAsync.pending,(state)=>{
      state.status='loading'
  })
  .addCase( updateUserAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.loggedInUser=action.payload
  })

    
    

    }
  })

  export const {setLogout,setUser}= authSlice.actions

  export const selectLoggedInUser=(state)=>state.auth.loggedInUser
  
  export const selectErrorUser=(state)=>state.auth.error


  export default authSlice.reducer
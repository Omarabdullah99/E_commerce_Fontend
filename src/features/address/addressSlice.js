import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToAddress, deleteFromAddress, fetchAddressItemByUserId } from "./addressApi";

const initialState = {
    status: 'idle',
    alladdress:[]
  };

  export const addToAddressAsync = createAsyncThunk(
    'address/addToAddress',
    async (item) => {
      const response = await addToAddress(item);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchAddressItemByUserIdAsync = createAsyncThunk(
    'address/fetchAddressItemByUserId',
    async (userId) => {
      const response = await fetchAddressItemByUserId(userId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

//   export const updateCartAsync = createAsyncThunk(
//     'cart/updateCart',
//     async (update) => {
//       const response = await updateCart(update);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     }
//   );

  export const deleteFromAddressAsync = createAsyncThunk(
    'address/deleteFromAddress',
    async (addressId) => {
      const response = await deleteFromAddress(addressId);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );



  


  export const addressSlice=createSlice({
    name:'address',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToAddressAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(addToAddressAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.alladdress.push(action.payload)
        })
        .addCase(fetchAddressItemByUserIdAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(fetchAddressItemByUserIdAsync.fulfilled,(state,action)=>{
            state.status='idle';
            state.alladdress = action.payload
        })
        .addCase(deleteFromAddressAsync.pending,(state)=>{
            state.status='loading'
        })
        .addCase(deleteFromAddressAsync.fulfilled,(state,action)=>{
            state.status='idle';
            const index =  state.alladdress.findIndex(item=>item.id===action.payload.id)
            state.alladdress.splice(index,1);
        })
         // .addCase(updateCartAsync.pending,(state)=>{
        //     state.status='loading'
        // })
        // .addCase(updateCartAsync.fulfilled,(state,action)=>{
        //     state.status='idle';
        //     const index =  state.items.findIndex(item=>item.id===action.payload.id)
        //     state.items[index] = action.payload;
            
        // })
      
        

    }
  })
  export default addressSlice.reducer
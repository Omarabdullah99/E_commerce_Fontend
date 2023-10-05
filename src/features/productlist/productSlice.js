import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {  fetchAllProductsByFilters,fetchCategories,fetchBrands, fetchProductById, createProduct, updateProduct, } from './productApi'

const initialState = {
    products: [],
    category:[],
    brands:[],
    status: 'idle',
    totalItems:0,
    selectedProduct:null
  };


  export const fetchAllProductByIdAsync= createAsyncThunk(
    'product/fetchAllProductById',
    async(id)=>{
        const response= await fetchProductById(id)
        return response.data
    }
  )


  export const fetchCategoryAsync= createAsyncThunk(
    'product/fetchCategroryAsync',
    async()=>{
        const response= await fetchCategories()
        return response.data
    }
  )

  export const fetchBrandsAsync= createAsyncThunk(
    'product/fetchBrandsAsync',
    async()=>{
        const response= await fetchBrands()
        return response.data
    }
  )

  export const fetchAllProductsByFilterAsync= createAsyncThunk(
    'product/fetchAllProductsByFilters',
    async({filter,sort,pagination})=>{
        const response= await fetchAllProductsByFilters(filter,sort,pagination)
        return response.data
    }
  )

  export const createProductAsync= createAsyncThunk(
    'product/createProductAsync',
    async(product)=>{
        const response= await createProduct(product)
        return response.data
    }
  )

  export const updateProductAsync= createAsyncThunk(
    'product/updateProductAsync',
    async(update)=>{
        const response= await updateProduct(update)
        return response.data
    }
  )

  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
    },
    extraReducers: (builder) => {
      builder
       
        .addCase(fetchAllProductsByFilterAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload.products;
          state.totalItems= action.payload.totalItems
        })
        .addCase(fetchCategoryAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.category = action.payload;
        })
        .addCase(fetchBrandsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.brands = action.payload;
        })
        .addCase(fetchAllProductByIdAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.selectedProduct = action.payload;
        })
        .addCase(createProductAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createProductAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products.push(action.payload)
        })
        .addCase(updateProductAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateProductAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          state.products[index] = action.payload;
        })
       
    },
  });

export const selectAllProducts = (state) => state.product.products;
export const selectAllCategory = (state) => state.product.category;
export const selectAllBrands = (state) => state.product.brands;
export const selectTotalItems = (state) => state.product.totalItems
export const selectProductById = (state) => state.product.selectedProduct
export const selectProductListStatus = (state) => state.product.status

export default productSlice.reducer;
  
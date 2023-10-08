import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, updateUserAsync } from "../../auth/authSlice";
import {useForm} from 'react-hook-form'
import { addToAddressAsync, deleteFromAddressAsync } from "../../address/addressSlice";
function UserProfile() {
    const dispatch=useDispatch()
    const userInfo= useSelector(selectLoggedInUser)
    console.log("userInfo",userInfo)
    const userAddress= useSelector((state)=> state.address.alladdress)
    console.log("profileaddress",userAddress)
    const [selectedEditIndex,setSeletedEditIndex]=useState(-1)
    const [showAddAddressForm, setShowAddAddressForm]= useState(false)

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
    } = useForm()

    const handleRemoveAddress=(e,id)=>{
      console.log("remove",id)
      dispatch(deleteFromAddressAsync(id))
    }



  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
           Name: {userInfo?.name}
          </h1>

          <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900">
            Email address : {userInfo?.result?.email}
          </h1>

          <h1 className="text-xl my-5 font-bold tracking-tight text-blue-500">
            User role : {userInfo?.result?.role}
          </h1>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

  {/*  ------------------------- New Address Form Part start --------------------------- */}
          <button
          onClick={e=>{setShowAddAddressForm(true); setSeletedEditIndex(-1)}}
          type="submit"
          className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
          Add Address
          </button>

          {showAddAddressForm  ?
            <form className="bg-white px-5 py-5 mt-12" onSubmit={handleSubmit((data)=>{
              dispatch(addToAddressAsync({fullname:data.fullname,email:data.email,phone:data.phone,district:data.district,streetaddress:data.streetaddress,city:data.city,area:data.area,pinCode:data.pinCode, user:userInfo?.result?.id  }))
              console.log('checkoutform',data)
             reset()
              
            })}>
              <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
              {/*----------------------------- personal information form ------------------------------------- */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="fullname"
                      {...register("fullname", { required: "FullName is required" })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.fullname && <p className="text-xl text-red-500">{errors.fullname.message}</p>}
                  </div>
                </div>
    
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", { required:"Email Address is required",
                    pattern:{
                      value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message:"email not valid"
                    }
                  })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && <p className="text-xl text-red-500">{errors.email.message}</p>}
                  </div>
                </div>
  
                <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone", { required: "Phone number  is required" })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && <p className="text-xl text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                  Districts
                  </label>
                  <div className="mt-2">
                    <select
                      id="district"
                      {...register("district", { required: "District  is required" })} 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Dhaka</option>
                      <option>Khulna</option>
                      <option>Jessore</option>
                      <option>Faridpur</option>
                      <option>Rajshahi</option>
                      <option>Chittagong</option>
                    </select>
                    {errors.district && <p className="text-xl text-red-500">{errors.district.message}</p>}
                  </div>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="streetaddress" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="streetaddress"
                      {...register("streetaddress", { required: "Streetaddress is required" })}      
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.streetaddress && <p className="text-xl text-red-500">{errors.streetaddress.message}</p>}
                  </div>
                </div>
    
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="city"
                      {...register("city", { required: "City is required" })}   
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city && <p className="text-xl text-red-500">{errors.city.message}</p>}
                  </div>
                </div>
    
                <div className="sm:col-span-2">
                  <label htmlFor="area" className="block text-sm font-medium leading-6 text-gray-900">
                   Area
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="area"
                      {...register("area", { required: "Area is required" })}   
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.area && <p className="text-xl text-red-500">{errors.area.message}</p>}
                  </div>
                </div>
    
                <div className="sm:col-span-2">
                  <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="pinCode"
                      {...register("pinCode", { required: "Pin Code is required" })}                 
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.pinCode && <p className="text-xl text-red-500">{errors.pinCode.message}</p>}
                  </div>
                </div>            
              </div>
  
              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
              onClick={e=> setShowAddAddressForm(false)}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>
  
               {/*----------------------------- personal information from end ------------------------------------- */}
            </div>
              </div>
            </form> : null}


         

          <p className="mt-0.5 text-sm text-gray-500"> Your Address: </p>
           {/*Personal Information */}
          {userAddress?.map((add,index)=>(
            <div>

            {/* ------------------------- Edit Address Form Part start ---------------------------*/}

            {/* ------------------------- Edit Form Part End ---------------------------*/}

            <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {add.fullname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {add.streetaddress}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {add.pinCode}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                {add.phone}
              </p>
              <p className="text-sm leading-6 text-gray-900">
                {add.city}
              </p>
            </div>

            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
              onClick={(e)=> handleRemoveAddress(e,add.id)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              >
              Remove
              </button>
            </div>
          </div>
          </div>

          ))}
         
          
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

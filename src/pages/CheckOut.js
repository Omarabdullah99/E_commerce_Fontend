import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, updateCartAsync } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/orders/orderSlice";
import {discountedPrice} from '../app/constants'
import { addToAddressAsync } from "../features/address/addressSlice";


function CheckOut() {
  const cartItems=useSelector((state)=> state.cart.items)
  console.log('checkout',cartItems)
  const currentOrder= useSelector(selectCurrentOrder)
  const totalAmount = cartItems.reduce((amount, item)=>discountedPrice(item.product)*item.quantity +amount,0)
  const totalItems = cartItems.reduce((total, item)=>item.quantity + total,0)
  const dispatch=useDispatch()
  const [selectedAddress,setSelectedAddress]=useState(null)
  const [paymentMethod,setPaymentMethod]=useState('cash')
  const user=useSelector(selectLoggedInUser)
  console.log('checkout',user)
  const userAddress= useSelector((state)=> state.address.alladdress)
  console.log('checkoutuserAddress',userAddress)

  //*handleAddress
  const handleAddress=(e)=>{
    console.log(e.target.value)
    setSelectedAddress(userAddress[e.target.value]) //!chnage user
  }

  //*handle payment radio
  const handlePayment=(e)=>{
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }

  //*order handlerOrder
 const handleOrder=()=>{
  if(selectedAddress && paymentMethod){
  const order= {cartItems,totalAmount,totalItems,user:user?.result?.id, paymentMethod,selectedAddress, status:'pending'}
  dispatch(createOrderAsync(order))
  console.log("order",order)
  }

  else{
    alert("Enter Address and Payment method")
  }

  //ToDo:ReDirect to order-success page, clear cart after order and on server change the stock number of items
  
  console.log("order Now")

 }

  //*Quantity and update handle
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  //*cart remove form item
  const handleRemove =(e, id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  
  return (
    <>
    {!cartItems.length && <Navigate to='/' replace={true}></Navigate>}
    {currentOrder && <Navigate to={`/ordersuccess/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        {/*------------------------ form Part-------------------------*/}
        <div className="lg:col-span-3">
          <form className="bg-white px-5 py-5 mt-12" onSubmit={handleSubmit((data)=>{
            // dispatch(updateUserAsync({...user?.result, address:[...user?.result?.address,data]}))
            dispatch(addToAddressAsync({fullname:data.fullname,email:data.email,phone:data.phone,district:data.district,streetaddress:data.streetaddress,city:data.city,area:data.area,pinCode:data.pinCode, user:user?.result?.id  }))
            console.log("checkoutForm",data)
            reset()
            console.log('checkoutform',data)
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
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Address
            </button>
          </div>

             {/*----------------------------- personal information from end ------------------------------------- */}

            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Choose from Existing address
            </p>

             {/*----------------------------- personal information address --------------------------------- */}
             <ul role="list" >
             {userAddress?.map((person,index) => (
               <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                 <div className="flex min-w-0 gap-x-4">
                 <input
                 onChange={handleAddress}
                 name="address"
                 type="radio"
                 value={index}
                 className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
               />
                   <div className="min-w-0 flex-auto">
                     <p className="text-sm font-semibold leading-6 text-gray-900">{person.fullname}</p>
                     <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.streetaddress}</p>
                     <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.pinCode}</p>
                   </div>
                 </div>
                 <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                   <p className="text-sm leading-6 text-gray-900">{person.phone}</p>
                   <p className="text-sm leading-6 text-gray-900">{person.city}</p>
                   
                 </div>
               </li>
             ))}
           </ul>

            {/*--------------------------- payment or cash seciton ----------------------------- */}
            <div className="mt-10 space-y-10">
            <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
           
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="cash"
                  name="payments"
                  onChange={handlePayment}
                  value="cash"
                  type="radio"
                  checked={paymentMethod === "cash"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                  Cash
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="card"
                  name="payments"
                  onChange={handlePayment}
                  value="card"
                  checked={paymentMethod === "card"}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                  Card payment
                </label>
              </div>
              
            </div>
          </fieldset>
            
            </div>

            {/*--------------------------- payment or cash seciton end ----------------------------- */}

            </div>

            
          </div>
            </div>

          
          </form>
        </div>
        {/*------------------------ form Part end-------------------------*/}

        {/*------------------------ ordersummary Part-------------------------*/}
        {/*mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 */}
        <div className="lg:col-span-2">
        <>
        <div className="mx-auto bg-white mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
        Cart
      </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartItems?.map((item) => (
                <li key={item?.proudct?.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item?.product?.thumbnail}
                      alt={item?.product?.title}  
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
  
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item?.product?.id}>{item?.product?.title}</a>
                        </h3>
                        <p className="ml-4">{discountedPrice(item?.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item?.product?.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      
                    <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select onChange={(e) => handleQuantity(e, item)} value={item?.quantity}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
  
                      <div className="flex">
                        <button
                        onClick={e=>handleRemove(e,item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{totalItems} items</p>
          </div>
         {cartItems.length && <div className="mt-6">
            <div
              onClick={handleOrder}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
              Order Now
            </div>
          </div>}
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
            <Link to={'/'}>
            <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
            </Link>
            </p>
          </div>
        </div>
        </div>
    
    </>

        </div>

        {/*------------------------ ordersummary Part-------------------------*/}
      </div>
    </div>
    </>
  );
}

export default CheckOut;

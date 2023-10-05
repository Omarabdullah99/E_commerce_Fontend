import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Home from "../../pages/Home";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCartAsync, updateCartAsync } from "./cartSlice";
import {discountedPrice} from '../../app/constants'
import { Oval } from "react-loader-spinner";
import Modal from "../common/Modal";

function Cart() {
  const [open, setOpen] = useState(true);
  const [openModal,setOpenModal]= useState(null)

  const cartItems=useSelector((state)=> state.cart.items)
  console.log('cart',cartItems)
  const status=useSelector((state)=> state.cart.status)
  console.log('cartstatus', status)
  
  
  const totalAmount = cartItems.reduce((amount, item)=> discountedPrice(item.product)*item.quantity +amount,0)
  const totalItems = cartItems.reduce((total, item)=>item.quantity + total,0)
  const dispatch=useDispatch()

  //*Quantity and update handle
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  // const handleQuantity = (e, item) => {
  //   const newQuantity = parseInt(e.target.value, 10); // Convert to an integer
  
  //   if (!isNaN(newQuantity) && newQuantity >= 1) {
  //     // Check if it's a valid number (not NaN) and at least 1
  //     dispatch(updateCartAsync({ id: item.id, quantity: newQuantity }));
  //   } 
  // };
  

  //*cart remove form item
  const handleRemove =(e, id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  return (
    <>
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
      Cart
    </h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems?.map((item) => (
              <li key={item.product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.product.id}>{item.product.title}</a>
                      </h3>
                      <p className="ml-4"> {discountedPrice(item.product)} </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.product.brand}
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
                          <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                    <div className="flex">
                    <Modal
                    title={`Delete ${item.product.title}`}
                    message="Are you sure you want to delete this Cart item?"
                    dangerOption="Delete"
                    cancleOption="Cancel"
                    dangerAction={e=>handleRemove(e,item.id)}
                    cancelAction={()=>setOpenModal(-1)}
                    showModal={openModal === item.id}f
                  >
                  </Modal>
                      <button
                      onClick={e => {setOpenModal(item.id)}}
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
          <Link
            to={'/checkout'}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>}
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
          <Link to={'/'}>
          <button
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => setOpen(false)}
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
  );
}

export default Cart;

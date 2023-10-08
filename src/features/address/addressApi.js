export function addToAddress(item) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/address', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  export function fetchAddressItemByUserId(userId){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-commerce-backend-flax-one.vercel.app/address?user='+userId)
        const data= await response.json()
        resolve({data})

    })
}


// export function updateCart(update) {
//     return new Promise(async (resolve) => {
//       const response = await fetch('http://localhost:8081/cart/'+update.id, {
//         method: 'PATCH',
//         body: JSON.stringify(update),
//         headers: { 'content-type': 'application/json' },
//       });
//       const data = await response.json();
//       resolve({ data });
//     });
//   }

  
export function deleteFromAddress(addressId) {
    return new Promise(async (resolve) => {
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/address/'+addressId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data:{id:addressId} });
    });
  }


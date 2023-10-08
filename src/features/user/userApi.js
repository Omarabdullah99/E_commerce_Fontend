export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/orders/user/'+userId) //! ?user.id to user
      const data = await response.json()
      console.log("userApi",data)
      resolve({data})
    }
    );
  }


  export function fetchLoggedInUserOrderSide(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://localhost:8081/users/'+userId) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  export function updateUser(update){
    return new Promise(async(resolve)=>{
        const response= await fetch('http://localhost:8081/users/'+update.id,{
            method:'PATCH',
            body:JSON.stringify(update),
            headers:{'content-type':'application/json'}
        })
        const data= await response.json()
        resolve({data})

    })
}
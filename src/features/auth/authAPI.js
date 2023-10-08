export function createUser(userData){
    return new Promise(async(resolve)=>{
        const response= await fetch('https://e-commerce-backend-flax-one.vercel.app/auth/signup',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{'content-type':'application/json'}
        })
        const data= await response.json()
        resolve({data})

    })
}

//!codedose e checkUser convert loginUser
export function checkeUser(loginInfo){
    return new Promise(async(resolve,reject)=>{
        try {
            const response= await fetch('https://e-commerce-backend-flax-one.vercel.app/auth/login',{
            method:'POST',
            body:JSON.stringify(loginInfo),
            headers:{'content-type':'application/json'}
        })
        if(response.ok){
            const data= await response.json()
            resolve({data})
        }else{
            const error= await response.text()
            console.log('loginapi',error)
            reject(error)
        }
       
        } catch (error) {
            reject(error)
            
        }
        
    })
}




//*AllDommy products get
// export function fetchAllProducts() {
//     return new Promise(async (resolve) =>{
//       //TODO: we will not hard-code server URL here
//       const response = await fetch('http://localhost:8081/products') 
//       const data = await response.json()
//       resolve({data})
//     }
//     );
//   }

  export function fetchProductById(id) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/products/'+id) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  //*products upor filter logic buildup
  export function fetchAllProductsByFilters(filter,sort,pagination) {
    // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}

  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  console.log("produtApi",pagination)
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }



  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/products?'+queryString) 
    const data = await response.json()
    const totalItems= await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:+totalItems}})
  })
  
   
  }
//*filters er category value show
  export function fetchCategories() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/category') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
//*filters er brands value show
  export function fetchBrands() {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/brands') 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  //*admin folder ProductForm e new prodduct add

  export function createProduct(product) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('https://e-commerce-backend-flax-one.vercel.app/products',{
        method:'POST',
        body:JSON.stringify(product),
        headers:{ 'content-type': 'application/json' }
      }) 
      const data = await response.json()
      resolve({data})
    }
    );
  }

  //*updateProduct Link admin ProductForm
  export function updateProduct(update) {
    return new Promise(async (resolve) => {
      const response = await fetch(
        'https://e-commerce-backend-flax-one.vercel.app/products/' + update.id,
        {
          method: 'PATCH',
          body: JSON.stringify(update),
          headers: { 'content-type': 'application/json' },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

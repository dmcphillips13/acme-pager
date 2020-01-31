// function render() {
//     const productsPromise = fetch('https://acme-users-api-rev.herokuapp.com/api/products')
//     const companiesPromise = fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
//     const offeringsPromise = fetch('https://acme-users-api-rev.herokuapp.com/api/offerings')

//     const P = Promise.all([productsPromise, companiesPromise, offeringsPromise])
//         .then(response => {
//             response.map(item => {
//                 return item.json()
//             })
//         })

//     const products = P;
//     console.log(products)


        

// }

// render()


function fetchData() {

    // notice how we don't use the await keyword yet
    // we want to give Promise.all() a promise, not the result
    const products = fetch('https://acme-users-api-rev.herokuapp.com/api/products')
    const companies = fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
    const offerings = fetch('https://acme-users-api-rev.herokuapp.com/api/offerings')

    // Promise.all() takes an ARRAY, which contains a list of Promises
    const allResponses = Promise.all([products, companies, offerings]);
  
    return allResponses
      .then(response => {
        // the response of Promise.all() is also an ARRAY
        // the elements of the response are in the same order as the parameters given to Promise.all()
        const productsResponse = response[0];
        const companiesResponse = response[1];
        const offeringsResponse = response[2];
  
        // We can use it again to get both JSON!
        return Promise.all([productsResponse.json(), companiesResponse.json(), offeringsResponse.json()]);
      })
      .then(JSONs => {
        const productsJSON = JSONs[0];
        const companiesJSON = JSONs[1];
        const offeringsJSON = JSONs[2];
  
        // finally, we have JSON data fetched from 2 different API endpoints
        const processed = productsJSON.map(product => {
            product.offerings = [];
            // const productOffering = productsJSON.map(product => {
            //     return product.id === offeringsJSON.productId
            // })
            console.log(product)
    
            // console.log(productOffering)
            offeringsJSON.filter(offering => {
                if (offering.productId === product.id) {
                    // product.offerings.push(offering)
                    product.offerings.push(offering)
                }
            });
            return product
        })

        console.log(productsJSON)

        // productsJSON.map()

      })
  }
  
  // Runs
  fetchData();
  
  // We return a promise so we can also wait here:
//   fetchData()
//     .then(JSONs => console.log('Our JSONS: ', JSONs));
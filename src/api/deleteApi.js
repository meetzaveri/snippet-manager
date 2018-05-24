const APIS = {
    deleteCodes : 'http://localhost:8000/codes/'
}

export default APIS;

export function DeleteApiCall(apiname,methodType,data,headers){
    return new Promise((resolve, reject) => {
       var config = {
            method: methodType, // or 'PUT'
            body: JSON.stringify(data),
            mode : 'cors',
            headers:  headers || {
              'Content-Type': 'application/json'
            }
       }
        fetch(apiname, config)
          
          .then((response) => {
              if(response.status === 400){
                  reject(new Error('Unauthorized'));
                  console.log('ERROR')
              }
              else if((response.status === 200) || 
              ((response.status === 304) )) {
                    resolve(response);
              }
          })
          .catch(error => {
             reject(Error(error.message));
          })
    })
}

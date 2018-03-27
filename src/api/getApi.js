const APIS = {
    getCodes : 'http://localhost:8000/codes'
}

export default APIS;

export function ApiCall(apiname,methodType,data,headers){
    return new Promise((resolve, reject) => {
       var config = {
            method: methodType, // or 'PUT'
            body: data,
            mode : 'cors',
            headers:  {
              'Content-Type': 'application/json'
            }
       }
       console.log('Config',config);
       if(methodType === 'GET'){
            delete config.body;
        }

        fetch(apiname, config)
          
          .then((response) => {
              if(response.status === 400){
                  reject(new Error('Unauthorized'));
                  console.log('ERROR')
              }
              else if((response.status === 200) || 
              ((response.status === 304) )) {
                  return resolve(response.json());
              }
          })
          .catch(error => {
             reject(Error(error.message));
          })
    })
}

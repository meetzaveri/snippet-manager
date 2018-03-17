const APIS = {
    getCodes : 'http://localhost:8000/codes'
}

export default APIS;

export function ApiCall(apiname,headers,data){
    return new Promise((resolve, reject) => {
        fetch(apiname, {
            method: 'GET', // or 'PUT'
            body: JSON.stringify(data), 
            mode : 'cors',
            headers: headers ? headers : new Headers({
              'Content-Type': 'application/json'
            })
          })
          .then((response) => {
              if(response.status === 400){
                  reject(new Error('Unauthorized'));
                  console.log('ERROR')
              }
              else if((response.status === 200) || 
              ((response.status ===304) )) {
                  return resolve(response.json());
              }
          })
          .catch(error => {
             reject(Error(error.message));
          })
    })
}

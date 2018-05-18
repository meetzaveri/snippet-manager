const APIS = {
    getCodes : 'https://protected-refuge-78696.herokuapp.com/codes',
    runCode : 'http://localhost:8000/run-code',
    getLanguageList : 'https://api.judge0.com/languages'
}

export default APIS;

export function ApiCall(apiname,methodType,data,headers){
    return new Promise((resolve, reject) => {
       var config = {
            method: methodType, // or 'PUT'
            body: JSON.stringify(data),
            mode : 'cors',
            headers:  headers || {
              'Content-Type': 'application/json'
            }
       }
    //    console.log('Config',config);
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
                    resolve(response.json());
              }
          })
          .catch(error => {
             reject(Error(error.message));
          })
    })
}

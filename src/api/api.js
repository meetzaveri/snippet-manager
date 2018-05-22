// const APIS = {
//   getCodes : 'https://protected-refuge-78696.herokuapp.com/codes',
//   runCode : 'http://localhost:8000/run-code',
//   login :'https://protected-refuge-78696.herokuapp.com/login',
//   register : 'http://localhost:8000/createuser',
//   getLanguageList : 'https://api.judge0.com/languages',
//   getCodeSnippet : ''
// }

const APIS = {
  getCodes : 'http://localhost:8000/codes',
  runCode : 'http://localhost:8000/run-code',
  login :'http://localhost:8000/login',
  register : 'http://localhost:8000/createuser',
  getLanguageList : 'https://api.judge0.com/languages',
  getCodeSnippet : ''
}

export default APIS;

export function ApiCall(apiname,methodType,data,headers){
  return new Promise((resolve, reject) => {
     var config = {
          method: methodType, // or 'PUT'
          body: JSON.stringify(data),
          mode : 'cors',
          headers: headers || {
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

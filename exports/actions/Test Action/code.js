/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/


const axios = require ('axios')
let newtoken
exports.onExecutePostLogin = async (event, api) => {


await axios.post('https://cesar-training.us.auth0.com/oauth/token',{
  "audience": "test",
  "grant_type": "client_credentials",
  "client_id": event.secrets.clientID,
  "client_secret": event.secrets.clientSecret
  }, {
 headers: { 
   
    'Content-Type': 'application/json', 
    }
})
 .then(function (response) {
    newtoken=response.data.access_token
  })
  

await axios.post('https://api-sbx.trimedx.com/mobile-account/v1/account',{
  "affiliation": "Indiana University Health System",
  "affiliation_sys_id": "c7e1bf4bdb323a003c9a7aa9bf961946"
  }, {
 headers: { 
   
    'Ocp-Apim-Subscription-Key': '7aca945fe45f4d5cb2faf6609eab55a1', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer '+newtoken
    }
})
   .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
      if (response.response.status == 401) {
      api.access.deny("401 Returned : UnAuthorized.");
  }       
    });
};

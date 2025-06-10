/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {

  if(event.authorization &&
     event.authorization.roles &&
     event.authorization.roles.length === 0)
     {
  
  const ManagementClient = require("auth0").ManagementClient;
  
  const management = new ManagementClient({
  domain: event.secrets.domain,
  clientId: event.secrets.clientId,
  clientSecret: event.secrets.clientSecret,
});

  const params = {id:event.user.user_id};
  const data = {"roles": ["rol_eINMnoymaPX9Qc4e"]};
  try{
  management.users.assignRoles(params,data);
  }catch(e){
    console.log(e)
  }
     }

};


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };

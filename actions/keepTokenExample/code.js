/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {

const ManagementClient = require('auth0').ManagementClient;
const jwt_decode = require('jwt-decode');
//Initialize management client with credentials
    const management = new ManagementClient({
    domain: event.secrets.domain,
    clientId: event.secrets.clientID,
    clientSecret: event.secrets.clientSecret,
  });

  //Get new access token and set it in cache
  const newToken = await management.getAccessToken();
     console.log(newToken)
  };

  //Get new access token and set it in cache


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };

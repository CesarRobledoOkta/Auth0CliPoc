/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {

   const ManagementClient = require("auth0").ManagementClient;
  
  const management = new ManagementClient({
  domain: event.secrets.domain,
  clientId: event.secrets.clientId,
  clientSecret: event.secrets.clientSecret,
    });

  // Replace with the user's Auth0 ID (this is the unique identifier for the user)
const userId = event.user.user_id;
console.log(userId)

  try {
    // Fetch roles for the specific user
    const roles = await management.users.getRoles({ id: "okta|OktaTest|00uik356gfwydDq5n697"});

    if (roles.length === 0) {
      console.log('No roles assigned to this user');
    } else {
      console.log(roles.data[0].id)
    }
  } catch (err) {
    console.error('Error fetching user roles:', err);
  }
}


/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };

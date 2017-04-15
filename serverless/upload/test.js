'use strict';
const aws = require("aws-sdk");
var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
});

module.exports.hello = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  const token = event.headers.Authorization
  var params = {
      AccessToken: token
  };
  cognitoidentityserviceprovider.getUser(params, function (err, data) {
      if (err) {
          console.log(err)
      } else {
          console.log(data)
          console.log(data.UserAttributes[0].Value) // user id
      }
      return;
  });
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
      "Access-Control-Allow-Methods": "GET,OPTIONS"
    },
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
  //context.done(null, 'Hello world');
};

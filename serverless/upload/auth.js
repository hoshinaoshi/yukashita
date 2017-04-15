const aws = require("aws-sdk");

var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
});

module.exports.auth = (event, context, callback)=> {
  console.log(JSON.stringify(event, undefined, 1));

  const TOKENS = event.authorizationToken.split(":")
  const ACCESS_TOKEN = TOKENS[0];
  const ID_TOKEN = TOKENS[1];

  cognitoidentityserviceprovider.getUser({AccessToken: ACCESS_TOKEN}, function (err, cognitUserAttributes) {
    if (err) {
      console.log(err)
      callback(null, generatePolicy('user', 'Deny', event.methodArn, []));
    } else {
      console.log(cognitUserAttributes)
      callback(null, generatePolicy('user', 'Allow', event.methodArn, cognitUserAttributes, ID_TOKEN));
    }
    return;
  });
};

const generatePolicy = function generatePolicy(principalId, effect, resource, cognitUserAttributes, idToken) {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action:   'execute-api:Invoke',
        Effect:   effect,
        Resource: resource
      }]
    },
    context: {
      cognitUserAttributes: cognitUserAttributes.UserAttributes[0].Value,
      idToken: idToken
    }
  };
};

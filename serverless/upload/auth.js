const aws = require("aws-sdk");

var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
});

module.exports.auth = (event, context, callback)=> {
  console.log(JSON.stringify(event, undefined, 1));

  const token = event.authorizationToken != null ? event.authorizationToken : event.headers.Authorization

  var params = {
      AccessToken: token
  };
  cognitoidentityserviceprovider.getUser(params, function (err, data) {
    if (err) {
      console.log(err)
      callback(null, generatePolicy('user', 'Deny', event.methodArn , token));
    } else {
      console.log(data)
      callback(null, generatePolicy('user', 'Allow', event.methodArn , token));
    }
    return;
  });
};

const generatePolicy = function generatePolicy(principalId, effect, resource , token) {
  return {
    principalId:principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: "arn:aws:execute-api:us-west-2:*:dzdvd4im60/*"
      }]
    }
  };
};

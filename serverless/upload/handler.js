'use strict';

const aws = require("aws-sdk");

var cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: 'us-west-2'
});

module.exports.upload = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';

  var options = {
    params: {
      apiVersion: '2006-03-01',
      Bucket: "yukashita-image-uploads"
    }
  };
  var bucket = new AWS.S3(options);

  const json = JSON.parse(event.body);
  const buffer = new Buffer(json.body.replace(/^data.+,/,""), 'base64'); // ファイルのbase64データ以外の情報を消す。

  var ccid = event.requestContext.authorizer.cognitUserAttributes;
  var idToken = event.requestContext.authorizer.idToken;
  console.log("=========")
  console.log(JSON.stringify({ccid: ccid, id_token: idToken, authorization: event.headers.Authorization}, undefined, 1));
  console.log("=========")
  console.log(["original-files", event.requestContext.stage, ccid, json.name.replace(/\//g,"")].join("/"))
  console.log("=========")

  var resultMsg = "Success";
  var statusCode = 200;
  console.log("identity_before: " + AWS.config.credentials.identityId)
  if(event.httpMethod == "POST") {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      region: "us-west-2",
      IdentityPoolId : 'us-west-2:3614712d-5a4a-4fd3-b0da-9ebc9b7be1eb',
      RoleArn: "arn:aws:iam::163792334106:role/Cognito_staging_poolAuth_Role",
      Logins : {
        'cognito-idp.us-west-2.amazonaws.com/us-west-2_QbJcF2OZB' : idToken
      }
    });
    AWS.config.credentials.get(function(err) {
      if (err) console.log(err);
      console.log(AWS.config.credentials);
      console.log("identity_after: " + AWS.config.credentials.identityId)
      console.log(["original-files", event.requestContext.stage, AWS.config.credentials.identityId, json.name.replace(/\//g,"")].join("/"));

      var params = {
        Key: ["original-files", event.requestContext.stage, AWS.config.credentials.identityId, json.name.replace(/\//g,"")].join("/"),
        ContentType: json.type,
        Body: buffer
      };
      bucket.putObject(params, function(err, data) {
        if (err) {
          resultMsg = "Error uploading data";
          statusCode = 500;
          console.log(resultMsg, err);
        } else {
          console.log(resultMsg, data);
        }
        context.done(null, 'Finished UploadObjectOnS3');
      });
    });
  }
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
      "Access-Control-Allow-Methods": "POST,OPTIONS"
    },
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
};

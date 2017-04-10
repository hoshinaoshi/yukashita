'use strict';

module.exports.upload = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
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
  const buffer = new Buffer(json.body.replace(/^data.+,/,""), 'base64'); // ファイルのデータ以外の情報を消す。

  var params = {
    Key: ["original-files", event.requestContext.stage, json.name.replace(/\//g,"")].join("/"),
    ContentType: json.type,
    Body: buffer
  };

  var resultMsg = "Success";
  var statusCode = 200;
  if(event.httpMethod == "POST") {
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

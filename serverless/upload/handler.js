'use strict';

module.exports.upload = (event, context, callback) => {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';

  var options = {
    params: {
      apiVersion: '2006-03-01',
      Bucket: "yukashita-image-uploads"
    }
  };
  var bucket = new AWS.S3(options)

  const json = JSON.parse(event.body);
  console.log(JSON.stringify(event,undefined,1));
  var params = {
    Key: "original-files/" + json.fileName,
    ContentType: json.type,
    Body: json.content
  };

  var resultMsg = "";
  var statusCode = 200;
  bucket.putObject(params, function(err, data) {
    if (err) {
      resultMsg = "Error uploading data";
      statusCode = 500;
      console.log(resultMsg, err);
    } else {
      resultMsg = "Successfully uploaded data";
      statusCode = 200;
      console.log(resultMsg, data);
    }
    //context.done(null, 'Finished UploadObjectOnS3');
  });
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: resultMsg
  };
  callback(null, response);
};


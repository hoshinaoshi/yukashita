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
  var params = {
    Key: "original-files/" + json.fileName,
    ContentType: json.type,
    Body: json.image
  };
  bucket.putObject(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to " + data);
    }
    context.done(null, 'Finished UploadObjectOnS3');
  });
};


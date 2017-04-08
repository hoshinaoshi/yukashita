'use strict';

module.exports.upload = (event, context, callback) => {
  var AWS = require('aws-sdk');
  AWS.config.region = 'us-west-2';
  var bucketName = 'yukashita-image-uploads';

  var options = {
    params: {
      Bucket: bucketName
    }
  };

  const params = JSON.parse(event.body); 
  var params = {
    Key: params.fileName,
    Body: params.image
  };
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to ");
    }
    context.done(null, 'Finished UploadObjectOnS3');
  });
};


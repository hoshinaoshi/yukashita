'use strict';
const aws = require("aws-sdk");

module.exports.create = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  
  s3ObjectKey = event.file_name

  callback(null, response);
};

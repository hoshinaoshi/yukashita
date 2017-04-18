'use strict';
const aws = require("aws-sdk");

module.exports.proxy = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  
  const response = {
    statusCode: 200,
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
};

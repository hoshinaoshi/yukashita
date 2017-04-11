'use strict';

module.exports.hello = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
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

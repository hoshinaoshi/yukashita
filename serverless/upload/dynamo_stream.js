'use strict';
const aws = require("aws-sdk");
aws.config.region = 'us-west-2';
var lambda = new aws.Lambda({apiVersion: '2014-11-11'});

function invokeLambda(functionName, streamRecord){
  var invokeParams = {
    FunctionName: functionName,
    InvokeArgs: streamRecord
  };
  lambda.invokeAsync(invokeParams, function(err, data) {
    if(err) {
     console.log(err + err.stack);
    }
    else {
     console.log(data);
    }
  });
}

module.exports.proxy = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));

  const records = event.Records
  records.forEach(function(record){
    switch (record.eventName) {
      case "INSERT":
        invokeLambda("INSERT", JSON.stringify(record, undefined, 1));
        break;
      case "MODIFY":
        //invokeLambda("MODIFY", record);
      case "REMOVE":
        //invokeLambda("REMOVE", record);
    }
  });

  const response = {
    statusCode: 200,
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
};

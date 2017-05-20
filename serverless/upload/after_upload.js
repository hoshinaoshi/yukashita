'use strict';
const aws = require("aws-sdk");
aws.config.region = 'us-west-2';
var lambda = new aws.Lambda({apiVersion: '2014-11-11'});

module.exports.handle = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  
  const dynamoDB = new aws.DynamoDB({region: 'us-west-2'});
  const records = event.Records
  records.forEach(function(record){
    var date = new Date();
    var params = {
      TableName: 'dev-items',
      Item: {
        'item_id':      { "N": date.getTime().toString() + record.s3.object.size.toString() },
        'user_id':      { "S": record.s3.object.key.split("/")[2].replace("%3",":") },
        'sale_started': { "N": "1" },
        'deleted':      { "N": "0" },
      }
    };
    dynamoDB.putItem(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
    // サムネイル作成
    var invokeParams = {
      FunctionName: "uploads-dev-thumbnail",
      InvokeArgs: JSON.stringify(event, undefined, 1)
    };
    lambda.invokeAsync(invokeParams, function(err, data) {
      if(err) {
       console.log(err + err.stack);
      }
      else {
       console.log(data);
      }
    });
  });


  const response = {
    statusCode: 200,
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
};

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

module.exports.handle = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));
  
  const dynamoDB = new aws.DynamoDB({region: 'us-west-2'});
  const records = event.Records
  records.forEach(function(record){
    const item_id = (new Date()).getTime().toString() + record.s3.object.size.toString()
    var params = {
      TableName: 'dev-items',
      Item: {
        'item_id':      { "N": item_id },
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

        event.item_id = item_id
        // サムネイル作成
        invokeLambda("uploads-dev-thumbnail", JSON.stringify(event, undefined, 1))
        // タグ
        invokeLambda("uploads-dev-rekognition", JSON.stringify(event, undefined, 1))
      }
    });
  });

  const response = {
    statusCode: 200,
    body: "{\"status\": \"seikou\"}"
  };
  callback(null, response);
};

'use strict';
const AWS = require("aws-sdk");
AWS.config.region = 'us-west-2';
AWS.config.apiVersions = {
  rekognition: '2016-06-27',
};
const rekognition = new AWS.Rekognition();
const dynamoDBClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

module.exports.handle = (event, context, callback) => {
  console.log(JSON.stringify(event, undefined, 1));
  console.log(JSON.stringify(context, undefined, 1));

  var params = {
    Image: {
      S3Object: {
        Bucket: event.Records[0].s3.bucket.name,
        Name:   event.Records[0].s3.object.key.replace("%3A",":")
      }
    }
  };
  var labels = [];
  rekognition.detectLabels(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    
    data.Labels.forEach(function(label){
      var conditionDetail = {};
      var keyName = label.Name;
      conditionDetail[keyName] = label.Confidence;
      labels.push(conditionDetail)
    });

    console.log("item_id: " + event.item_id);
    console.log(JSON.stringify(event, undefined, 1));
    var updateParams = {
      TableName: 'dev-items',
      Key: { "item_id": 1492473563444288715 },
      UpdateExpression: 'SET tags = :rekognition_tags',
      ExpressionAttributeValues: {':rekognition_tags': labels}
    };

    dynamoDBClient.update(updateParams, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
    const response = {
      statusCode: 200,
      body: "{\"status\": \"seikou\"}"
    };
    callback(null, response);
  });
};

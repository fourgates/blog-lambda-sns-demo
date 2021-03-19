const AWS = require("aws-sdk");    

/**
 * A Lambda function that sends a SNS message
 *
 */
exports.handler = (event, context) => {
    const message = 'Hello from Lambda!';
    return sendEmail(message).then((err,data)=>{
        console.log ("We are in the callback!");
        if (err) {
            console.log('Error sending a message', err);
            context.fail(err);
        } else {
            console.log('Sent message:', data.MessageId);
            context.succeed("Done!");
        }      
    });    
}

function sendEmail(message){
    const awsRegion = "us-east-1";
    // FIXME - update this ARN
    const snsTopic = 'arn:aws:sns:us-east-1:11223344:LambdaTest';
    const snsSubject = 'SNS Subject';
    // Create publish parameters
    var params = {
      Message: message,
      Subject: snsSubject,
      TopicArn: snsTopic
    };
    var sns = new AWS.SNS({ region: awsRegion });
    return sns.publish(params).promise();
}
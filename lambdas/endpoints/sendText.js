const Responses = require("../common/API_Responses");
const AWS = require("aws-sdk");
const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (!body || !body.phoneNumber || !body.message) {
    return Responses._400({
      message: "Phone Number and message are all required in the body",
    });
  }

  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Promotional",
    },
  };

  const messageParams = {
    Message: body.message,
    PhoneNumber: body.phoneNumber,
  };

  try {
    await SNS.setSMSAttributes(AttributeParams).promise();
    await SNS.publish(messageParams).promise();
    return Responses._200({ message: "Text message has been sent" });
  } catch (err) {
    console.log("error sending email", err);
    return Responses._400({
      message: "There was an error sending text message",
      err: err,
    });
  }
};

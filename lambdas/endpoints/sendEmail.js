const Responses = require("../common/API_Responses");
const AWS = require("aws-sdk");
const SES = new AWS.SES();

exports.handler = async (event, context) => {
  const { to, from, subject, text } = JSON.parse(event.body);

  if (!to || !from || !subject || !text) {
    return Responses._400({
      message: "To, From, Subject, Text are all required in the body",
    });
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();
    return Responses._200({});
  } catch (err) {
    console.log("error sending email", err);
    return Responses._400({
      message: "There was an error sending email",
      err: err,
    });
  }
};

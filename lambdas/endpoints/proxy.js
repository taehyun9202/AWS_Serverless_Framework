const Responses = require("../common/API_Responses");

exports.handler = async (event, context) => {
  return Responses._200();
};

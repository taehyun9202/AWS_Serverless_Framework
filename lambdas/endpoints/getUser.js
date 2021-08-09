const Responses = require("../common/API_Responses");

exports.handler = async (event, context) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "missing the ID from the path" });
  }

  let ID = event.pathParameters.ID;

  if (data[ID]) {
    return Responses._200(data[ID]);
  }
  return Responses._400({ message: "not ID in data" });
};

const data = {
  1: { name: "tyler", age: 29, location: "VA" },
  2: { name: "lena", age: 25, location: "NY" },
  3: { name: "royce", age: 30, location: "IL" },
};

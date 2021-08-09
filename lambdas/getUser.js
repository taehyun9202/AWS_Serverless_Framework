const Responses = require("./API_Responses");
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  console.log(`Event: ${event}`);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID
    return Responses._400({ message: "missing the ID from the path" });
  }

  let ID = event.pathParameters.ID;

  if (data[ID]) {
    //   return data
    return Responses._200(data[ID]);
  }

  // failed as ID not in the data
  return Responses._400({ message: "not ID in data" });
};

const data = {
  1: { name: "tyler", age: 29, location: "VA" },
  2: { name: "lena", age: 25, location: "NY" },
  3: { name: "royce", age: 30, location: "IL" },
};

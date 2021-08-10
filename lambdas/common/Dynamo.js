const AWS = require("aws-sdk");
const { HotUpdateChunk } = require("webpack");
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data || !data.Item) {
      throw Error(
        `There was an error fetching the data for ID of ${ID} from ${TableName}`
      );
    }

    console.log(data);
    return data.Item;
  },

  async put(data, TableName) {
    if (!data.ID) {
      throw Error("No ID on the data");
    }
    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting Id of ${data.ID} into ${TableName}`
      );
    }

    return data;
  },

  async update({
    tableName,
    primaryKey,
    primaryKeyValue,
    updateKey,
    updateValue,
  }) {
    const params = {
      TableName: tableName,
      Key: { [primaryKey]: primaryKeyValue },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ":updateValue": updateValue,
      },
    };

    return documentClient.update(params).promise();
  },

  async query({ tableName, index, queryKey, queryValue }) {
    const params = {
      TableName: tableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = hkey`,
      ExpressionAttributeValues: {
        ":hkey": queryValue,
      },
    };

    const res = await documentClient.query(params).promise();

    return res.Items || [];
  },
};
module.exports = Dynamo;

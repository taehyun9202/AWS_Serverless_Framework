const AWS = require("aws-sdk");
const { write } = require("fs");
const { get } = require("./Dynamo");
const s3Client = new AWS.S3();

const S3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };

    let data = await s3Client.getObject(params).promise();

    if (!data) {
      throw Error(`Failed to get file ${fileName}, from ${bucket}`);
    }

    if (fileName.slice(fileName.length - 4, fileName.length) == "json") {
      data = data.Body.toString();
    }
    return data;
  },

  async put(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error("There was an error creatig file in S3");
    }

    return newData;
  },

  async postImage(buffer, Key, type, bucket) {
    const params = {
      Body: buffer,
      Key: Key,
      ContentType: type,
      Bucket: bucket,
      ACL: "public-read",
    };

    const newImage = await s3Client.putObject(params).promise();

    if (!newImage) {
      throw Error("There was an error posting image in S3");
    }

    return newImage;
  },
};

module.exports = S3;

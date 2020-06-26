import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function deleteAuction(event, context) {
  const { id } = event.pathParameters;

  try {
    await dynamodb
      .delete({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Deleted Successfully"),
  };
}

export const handler = commonMiddleware(deleteAuction);

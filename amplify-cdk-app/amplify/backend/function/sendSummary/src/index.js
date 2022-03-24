/* Amplify Params - DO NOT EDIT
    API_AMPLIFIEDSHOPPING_GRAPHQLAPIENDPOINTOUTPUT
    API_AMPLIFIEDSHOPPING_GRAPHQLAPIIDOUTPUT
    API_AMPLIFIEDSHOPPING_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const fetch = require('node-fetch');
const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const graphqlQuery = `query listRecords {
    listRecords {
        items {
            id
            raceId
            name
            discordId
            section
            team
            result
            description
        }
    }
}
`;

exports.handler = async (event) => {
  const response = await fetch(
    process.env.API_AMPLIFIEDSHOPPING_GRAPHQLAPIENDPOINTOUTPUT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_AMPLIFIEDSHOPPING_GRAPHQLAPIKEYOUTPUT,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        operationName: 'listRecords',
      }),
    }
  );

  const result = await response.json();
  const records = result.data.listRecords.items;

  await sns
    .publish({
      // For demo purposes hard-coded, normally recommended to use environment variable
      // TopicArn: '<YOUR-SNS-TOPIC-ARN-HERE>',
      TopicArn: 'arn:aws:sns:ap-northeast-1:742014795691:sns-topic-amplifycdkapp-dev',
      Message:
        `Here's records summary - ${new Date().toDateString()}:\n` +
        `${records
          .map((record) => `${record.section} ${record.team} ${record.name} ${record.result}`)
          .join('\n')}`,
    })
    .promise()
    .catch((e) => console.log(e));

  return true;
};

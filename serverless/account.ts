import { APIGatewayProxyHandler } from 'aws-lambda';
import { WyreServices } from './WyreServices';

const ACCOUNT_ID = '';
const SUB_ACCOUNT_ID = '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  let httpMethod = event["httpMethod"];
  console.log(httpMethod);
  if (httpMethod === 'POST') {
    return await post(event);
  } else if (event["path"] === 'account/document') {
    return await postDocument(event);
  } else {
    return await get(event);
  }
}

async function get(event) {
  try {
    let wyreService = new WyreServices();
    let accountId = ACCOUNT_ID;
    await wyreService.getAccount(accountId, true).then((result) => {
      console.log(JSON.stringify(result.data));
      return {
        statusCode: 200,
        body: JSON.stringify(result.data),
      }
    });
  } catch (e) {
    console.log('error caught');
    console.log(e);
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}

async function post(event) {
  try {
    let wyreService = new WyreServices();
    await wyreService.createAccount(
      event['body']['accountId'],
      event['body']['country'],
      event['body']['fullName'],
      event['body']['email'],
      event['body']['street1'],
      event['body']['street2'],
      event['body']['city'],
      event['body']['state'],
      event['body']['postalCode'],
      event['body']['ssn'],
      event['body']['dob'] //YYYY-MM-DD
    ).then((result) => {
      console.log(JSON.stringify(result.data));
      return {
        statusCode: 200,
        body: JSON.stringify(result.data),
      }
    });
  } catch (e) {
    console.log('error caught');
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    }
  }
}
async function postDocument(event) {
  try {
    let wyreService = new WyreServices();
    await wyreService.uploadDocument(
      ACCOUNT_ID,
      event['body'],
      true
    ).then((result) => {
      console.log(JSON.stringify(result.data));
      return {
        statusCode: 200,
        body: JSON.stringify(result.data),
      }
    });
  } catch (e) {
    console.log('error caught');
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    }
  }
}

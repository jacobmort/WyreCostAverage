import { APIGatewayProxyHandler } from 'aws-lambda';
import { WyreServices } from './WyreServices';

const ACCOUNT_ID = '';
const SUB_ACCOUNT_ID = '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  let httpMethod = event["httpMethod"];
  //return await call("getAccount", [SUB_ACCOUNT_ID, true]);
  // return call("getPaymentMethod", ['PA_42VJMPZH7UZ', SUB_ACCOUNT_ID, true]);
  return await call("transfer", [
    "paymentmethod:PA_42VJMPZH7UZ",
    "USD",
    "10.0",
    `account:${SUB_ACCOUNT_ID}`,
    "USD",
    "test"]);
  // if (httpMethod === 'POST') {
  //   if (event["path"] === 'account/document') {
  //     return await call("postDocument", [event['body']]);
  //   } else if (event["path"] === 'account/payment') {
  //     return await call("addPaymentMethod", [accountId, paymentId]);
  //   } else {
  //     return await call("create", [
  //   event['body']['accountId'],
  //     event['body']['country'],
  //     event['body']['fullName'],
  //     event['body']['email'],
  //     event['body']['cellphone'],
  //     event['body']['street1'],
  //     event['body']['street2'],
  //     event['body']['city'],
  //     event['body']['state'],
  //     event['body']['postalCode'],
  //     event['body']['ssn'],
  //     event['body']['dob']
  // ]);
  //   }
  // } else {
  //   return await call("getAccount", [SUB_ACCOUNT_ID, true]);
  // }
}

async function call(wyreServiceMethod: string, args) {
  try {
    let wyreService = new WyreServices();
    await wyreService[wyreServiceMethod](...args).then((result) => {
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



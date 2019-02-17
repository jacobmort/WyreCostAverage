import { APIGatewayProxyHandler } from 'aws-lambda';
import { WyreServices } from './WyreServices';

// const ACCOUNT_ID = 'AC_8XBAYGXRE4R';
// const SUB_ACCOUNT_ID = 'AC_7G3GT3CDH9V';
const PAYMENT_ID = 'PA_42VJMPZH7UZ';

export const handler = async (event, context, callback) => {
  //return await call("getAccount", [SUB_ACCOUNT_ID, true]);
  // return call("getPaymentMethod", ['PA_42VJMPZH7UZ', SUB_ACCOUNT_ID, true]);
  // return await call("transfer", [
  //   "paymentmethod:PA_42VJMPZH7UZ",
  //   "USD",
  //   "10.0",
  //   `account:${SUB_ACCOUNT_ID}`,
  //   "USD",
  //   "test"]);

  let httpMethod = event["httpMethod"];
  let path = event["path"];
  let accountId;
  if ('accountId' in event.pathParameters) {
    accountId = event.pathParameters.accountId;
  }
  let response;
  if (httpMethod === 'POST') {
    if (path.indexof('document') !== -1) {
      response = await call("uploadDocument", [accountId, event['body'], true]);
    } else if (path.indexOf('payment') !== -1) {
      const paymentId = event.pathParameters.id;
      response = await call("addPaymentMethod", [accountId, paymentId, true]);
    } else {
      response = await call("create", [
        event['body']['accountId'],
        event['body']['country'],
        event['body']['fullName'],
        event['body']['email'],
        event['body']['cellphone'],
        event['body']['street1'],
        event['body']['street2'],
        event['body']['city'],
        event['body']['state'],
        event['body']['postalCode'],
        event['body']['ssn'],
        event['body']['dob']
      ]);
    }
  } else {
    response = await call("getAccount", [accountId, true]);
  }
  callback(null, response);
}

async function call(wyreServiceMethod: string, args) {
  try {
    let wyreService = new WyreServices();
    const result = await wyreService[wyreServiceMethod](...args);
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    }
  } catch (e) {
    console.log('error caught');
    console.log(e);
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}



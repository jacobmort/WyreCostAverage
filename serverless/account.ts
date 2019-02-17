import { APIGatewayProxyHandler } from 'aws-lambda';
import { WyreServices } from './WyreServices';

export const handler = async (event, context, callback) => {
  let httpMethod = event["httpMethod"];
  let path = event["path"];
  let accountId;
  let response;
  if ('accountId' in event.pathParameters) {
    accountId = event.pathParameters.accountId;
  }
  if (httpMethod === 'POST') {
    if (path.indexOf('document') !== -1) {
      response = await call("uploadDocument", [accountId, event['body'], true]);
    } else if (path.indexOf('payment') !== -1) {
      const paymentId = event.pathParameters.id;
      response = await call("addPaymentMethod", [accountId, paymentId, true]);
    } else if (path.indexOf("transfer") !== -1) {
      response = await call("transfer", [
        accountId,
        event['body']['srn'],
        event['body']['sourceCurrencySymbol'],
        event['body']['sourceAmt'],
        event['body']['destSrn'],
        event['body']['destCurrencySymbol'],
        event['body']['message'],
        true])
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
    if (path.indexOf("payment") !== -1) {
      const paymentId = event.pathParameters.id;
      response = await call("getPaymentMethod", [accountId, paymentId, true]);
    } else if (path.indexOf('transfer') !== -1) {
      const transferId = event.pathParameters.id;
      response = await call('transferStatus', [accountId, transferId, true]);
    } else {
      response = await call("getAccount", [accountId, true]);
    }
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



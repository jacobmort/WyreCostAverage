import { WyreServices } from './WyreServices';

const OUR_ACCOUNT_ID = 'AC_8XBAYGXRE4R'

export const handler = async (event, context, callback) => {
  let httpMethod = event["httpMethod"];
  let path = event["path"];
  let accountId;
  let response;
  if (event.pathParameters && 'accountId' in event.pathParameters) {
    accountId = event.pathParameters.accountId;
  }
  if (httpMethod === 'POST') {
    if (path.indexOf('document') !== -1) {
      response = await call("uploadDocument", [accountId, event.body, true]);
    } else if (path.indexOf('payment') !== -1) {
      const paymentId = event.pathParameters.id;
      response = await call("addPaymentMethod", [accountId, paymentId, true]);
    } else if (path.indexOf("transfer") !== -1) {
      let payload = JSON.parse(event.body);
      response = await call("transfer", [
        accountId,
        payload.srn,
        payload.sourceCurrencySymbol,
        payload.sourceAmt,
        payload.destSrn,
        payload.destCurrencySymbol,
        payload.message,
        true])
    } else {
      let payload = JSON.parse(event.body);
      response = await call("createAccount", [
        OUR_ACCOUNT_ID,
        payload.country,
        payload.fullName,
        payload.email,
        payload.cellphone,
        payload.street1,
        payload.street2,
        payload.city,
        payload.state,
        payload.postalCode,
        payload.ssn,
        payload.dob
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.data),
    }
  } catch (e) {
    console.log('error caught');
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: e.message,
    }
  }
}



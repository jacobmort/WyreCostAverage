import { APIGatewayProxyHandler } from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';
import { HmacSHA256 } from 'crypto-js';

const API_KEY = '';
const API_SECRET = ''
const ACCOUNT_ID = '';
export const hello: APIGatewayProxyHandler = async (event, context) => {
  try {
    await calllApi(ACCOUNT_ID).then((result) => {
      console.log(result);
    });
  } catch (e) {
    console.log('error caught');
    console.log(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  }
}

function calllApi(accountId: string): Promise<AxiosResponse> {
  const baseURL = 'https://api.testwyre.com';
  const endPoint = `/v3/accounts/${accountId}`;
  const url = `${baseURL}${endPoint}`;
  // Additionally, you should include a GET parameter named timestamp which is the current time in millisecond epoch format. We use this timestamp to help protect against replay attacks.
  const urlTimestamped = `${url}?timestamp=${(new Date).getTime()}`;
  const signed = signMessage(url, "");
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'X-Api-Key': API_KEY,
        'X-Api-Signature': signed,
      }
    });
    instance.get(urlTimestamped, {
    }).then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
}

function signMessage(url: string, body: string): string {
  /* Calculating the X-Api-Signature field is a two step process:
  1. Concatenate the request URL with the body of the HTTP request (encoded using UTF8) into a string. Use an empty string for the HTTP body in GET requests
  2. Compute the signature as a HEX encoded HMAC with SHA-256 and your API Secret Key
  Note: You must send the request body exactly as you sign it, whitespace and all. The server calculates the signature based on exactly what's in the request body.
  https://docs.sendwyre.com/docs/authentication#section-calculating-the-request-signature
  */
  const urlEnc = Buffer.from(`${url}${body}`).toString('base64');
  const hmaced = HmacSHA256(urlEnc, API_SECRET).toString();
  return new Buffer(hmaced).toString('hex');
}

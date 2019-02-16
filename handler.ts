import { APIGatewayProxyHandler } from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';
import { HmacSHA256 } from 'crypto-js';

const API_KEY = '';
const API_SECRET = ''
const ACCOUNT_ID = '';
export const hello: APIGatewayProxyHandler = async (event, context) => {
  await calllApi(ACCOUNT_ID).then((result) => {
    console.log(result);
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  }
}

function calllApi(accountId: string): Promise<AxiosResponse> {
  const baseURL = 'https://api.sendwyre.com';
  const endPoint = `/v3/accounts/${accountId}?X-Api-Key=${API_SECRET}&X-Api-Signature`;
  const url = `${baseURL}${endPoint}`;
  const signed = signMessage(url, "");
  console.log(signed);
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'X-Custom-Header': API_KEY,
        'X-Api-Signature': signed
      }
    });
    instance.get(url, {
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
*/
  const urlEnc = Buffer.from(`${url}${body}`).toString('base64');
  const hmaced = HmacSHA256(urlEnc, API_SECRET).toString();
  return new Buffer(hmaced).toString('hex');
}

import { APIGatewayProxyHandler } from 'aws-lambda';
import axios, { AxiosResponse } from 'axios';
const API_ID = '';
const API_SECRET = '';
const ACCOUNT_ID = '';
export const hello: APIGatewayProxyHandler = async (event, context) => {
  await calllApi().then((result) => {
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

function calllApi(): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'https://api.sendwyre.com',
      headers: { 'X-Custom-Header': API_ID }
    });
    instance.get(`/v3/accounts/${ACCOUNT_ID}?X-Api-Key=${API_SECRET}&X-Api-Signature`, {
    }).then((result) => {
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
}

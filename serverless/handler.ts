import { APIGatewayProxyHandler } from 'aws-lambda';
import { WyreServices } from './WyreServices';

const ACCOUNT_ID = '';
const SUB_ACCOUNT_ID = "";
export const hello: APIGatewayProxyHandler = async (event, context) => {
  try {
    let wyreService = new WyreServices();
    await wyreService.getAccount(ACCOUNT_ID, SUB_ACCOUNT_ID).then((result) => {
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

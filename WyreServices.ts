import axios, { AxiosResponse } from 'axios';
import { HmacSHA256 } from 'crypto-js';

const API_KEY = '';
const API_SECRET = ''

export class WyreServices {
  getAccount(accountId: string): Promise<AxiosResponse> {
    const endPoint = `/v3/accounts/${accountId}`;
    const url = this.generateUrl(endPoint);
    const signed = this.signMessage(url, " ");
    return this.getRequest(url, signed);
  }

  timestampUrl(url: string): string {
    // Additionally, you should include a GET parameter named timestamp which is the current time in millisecond epoch format. We use this timestamp to help protect against replay attacks.
    return `${url}?timestamp=${(new Date).getTime()}`;
  }

  generateUrl(restEndpoint: string): string {
    const baseURL = 'https://api.testwyre.com';
    const url = `${baseURL}${restEndpoint}`;
    // TODO it seems like timestamp isn't included in the URL which is hashed but I can't get it to work either way
    return this.timestampUrl(url);
  }

  getRequest(url: string, signature: string): Promise<AxiosResponse> {
    const signed = this.signMessage(url, "");
    return new Promise((resolve, reject) => {
      const instance = axios.create({
        headers: {
          'X-Api-Key': API_KEY,
          'X-Api-Signature': signed,
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

  signMessage(url: string, body: string): string {
    /* Calculating the X-Api-Signature field is a two step process:
    1. Concatenate the request URL with the body of the HTTP request (encoded using UTF8) into a string. Use an empty string for the HTTP body in GET requests
    2. Compute the signature as a HEX encoded HMAC with SHA-256 and your API Secret Key
    Note: You must send the request body exactly as you sign it, whitespace and all. The server calculates the signature based on exactly what's in the request body.
    https://docs.sendwyre.com/docs/authentication#section-calculating-the-request-signature
    */
    const urlEnc = `${url}${body}`;
    return HmacSHA256(urlEnc, API_SECRET).toString();
  }
}
import { HTTPError } from "got";

type NetsuiteBodyError = {
  type: string;
  title: string;
  status: number;
  "o:errorDetails": {
    detail: string;
    "o:errorQueryParam": string;
    "o:errorCode": string;
  }[];
};

export class NetsuiteError extends Error {
  constructor(httpError: HTTPError) {
    const body = httpError?.response?.body as NetsuiteBodyError;
    const text = body["o:errorDetails"][0]?.detail;
    super(text || httpError.message);
  }
}

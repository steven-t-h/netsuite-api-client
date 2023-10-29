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
    try {
      const body = httpError?.response?.body;
      const data = JSON.parse(body as string) as NetsuiteBodyError;
      const text = data["o:errorDetails"][0].detail;
      super(text || httpError.message);
    } catch (e) {
      super(httpError.message);
    }
  }
}

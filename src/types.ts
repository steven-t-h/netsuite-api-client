export type NetsuiteOptions = {
  consumer_key: string;
  consumer_secret_key: string;
  token: string;
  token_secret: string;
  realm: string;
  base_url?: string;
};

export type NetsuiteRequestOptions = {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';
  body?: any;
  heads?: any;
};

export type NetsuiteResponse = {
  statusCode: number;
  headers: NodeJS.Dict<string | string[]>;
  data: any;
};

export type NetsuiteQueryResult = {
  items: any[];
  hasMore: boolean;
};

import "dotenv/config";
import NetsuiteApiClient from "../src/netsuite-rest";
import { describe, expect, test, beforeAll, afterAll, it } from "vitest";

describe("Netsuite Rest Webservices", () => {
  let NsApi: NetsuiteApiClient;
  let NsApiBaseUrl: NetsuiteApiClient;

  beforeAll(async () => {
    if (
      process.env.consumer_key == undefined ||
      process.env.consumer_secret_key == undefined ||
      process.env.token == undefined ||
      process.env.token_secret == undefined ||
      process.env.realm == undefined
    ) {
      throw new Error("Please create a `.env` file based on `.env.sample`");
    }

    NsApi = new NetsuiteApiClient({
      consumer_key: process.env.consumer_key,
      consumer_secret_key: process.env.consumer_secret_key,
      token: process.env.token,
      token_secret: process.env.token_secret,
      realm: process.env.realm,
    });

    // with base_url
    NsApiBaseUrl = new NetsuiteApiClient({
      consumer_key: process.env.consumer_key,
      consumer_secret_key: process.env.consumer_secret_key,
      token: process.env.token,
      token_secret: process.env.token_secret,
      realm: process.env.realm,
      base_url: process.env.base_url,
    });
  });

  afterAll(async () => {});

  it("should check env and NsApi", () => {
    expect(process.env.consumer_key).toBeDefined();
    expect(process.env.consumer_secret_key).toBeDefined();
    expect(process.env.token).toBeDefined();
    expect(process.env.token_secret).toBeDefined();
    expect(process.env.realm).toBeDefined();
    expect(NsApi).toBeDefined();
  });

  test("should make test request", async () => {
    expect.assertions(1);
    const response = await NsApi.request({
      method: "OPTIONS",
    });
    expect(response.statusCode).toEqual(204);
  });

  test("should make GET request - GET Customers", async () => {
    expect.assertions(1);
    const response = await NsApi.request({
      path: "record/v1/customer/",
    });
    expect(response.statusCode).toEqual(200);
  });

  test("should make POST request - SuiteQL Query", async () => {
    expect.assertions(1);
    const response = await NsApi.request({
      path: "query/v1/suiteql?limit=5",
      method: "POST",
      body: `{
                   "q": "SELECT id, companyName, email, dateCreated FROM customer WHERE dateCreated >= '01/01/2019' AND dateCreated < '01/01/2020'"
                }`,
    });
    expect(response.statusCode).toEqual(200);
  });

  test("should work with base_url", async () => {
    expect.assertions(2);
    expect(process.env.base_url).toBeDefined();

    const response = await NsApiBaseUrl.request({
      method: "OPTIONS",
    });
    expect(response.statusCode).toEqual(204);
  });

  test("should work with additional headers", async () => {
    expect.assertions(1);
    const response = await NsApi.request({
      method: "OPTIONS",
      heads: {
        foo: "foo",
      },
    });
    expect(response.statusCode).toEqual(204);
  });
});

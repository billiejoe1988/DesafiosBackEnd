import { describe, test, before } from "node:test";
import assert from "node:assert";

const apiURL = "http://localhost:8080/api";

describe("TEST Products router", () => {
  test("[GET] /AllProducts", async () => {
    const response = await fetch(`${apiURL}/products/`);
    const responseJson = await response.json();
    assert.strictEqual(Array.isArray(responseJson.data.payload), true);
    assert.ok(responseJson.data.payload.length > 0);
    assert.equal(response.status, 200);
  });

  test("[GET] / findById", async () => {
    const response = await fetch(`${apiURL}/products/`);
    const responseJson = await response.json();
    const { _id } = responseJson.data.payload[0];
    const productById = await fetch(`${apiURL}/products/${_id}`);
    const productByIdJson = await productById.json();
    assert.strictEqual(response.status, 200);
    assert.ok(typeof productByIdJson === "object");
    assert.strictEqual(_id, productByIdJson.data._id);
  });

  test("[GET] / findByWrongId", async () => {
    const _id = "66c3d25674106f92f9b8f8b7";
    const productById = await fetch(`${apiURL}/products/${_id}`);
    const productByIdJson = await productById.json();
    const errorResponse = "product not found";
    assert.strictEqual(productById.status, 404);
    assert.ok(typeof productByIdJson === "object");
    assert.ok(productByIdJson.data === null);
    assert.equal(productByIdJson.message.custom, errorResponse);
  });
});

describe("TEST User router", () => {
  test("[POST] / user login", async () => {
    const body = JSON.stringify({
      email: "jp.sarobe@gmail.com",
      password: "1234",
    });
    const resp = await fetch(`${apiURL}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const respJson = await resp.json();
    assert.strictEqual(resp.status, 200);
    assert.ok(typeof respJson === "object");
    assert.ok(respJson.data.hasOwnProperty("message"));
  });

  test("[POST] / user wrong login", async () => {
    const body = JSON.stringify({
      email: "jp.sarobe@gmail.com",
      password: "12345",
    });
    const resp = await fetch(`${apiURL}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    assert.strictEqual(resp.status, 401);
    assert.equal(resp.statusText, "Unauthorized");
  });
});

describe("TEST Cart router", () => {
  test("[GET] / try get cart without login", async () => {
    const resp = await fetch(`${apiURL}/userCart`);
    assert.strictEqual(resp.status, 404);
    assert.equal(resp.statusText, "Not Found");
  });
});

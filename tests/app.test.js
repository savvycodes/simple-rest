const request = require("supertest");
const app = require("../src/app");

const { Todo } = require("../src/models");

beforeEach(async () => {
  await Todo.create({ name: "Test the API" });
});

describe("/", () => {
  it(`should give a 200 response with todos`, async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});

afterEach(async () => {
  await Todo.destroy({
    where: {},
    truncate: true,
  });
});

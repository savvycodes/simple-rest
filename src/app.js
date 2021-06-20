const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const pino = require("express-pino-logger");
const Joi = require("joi");

const models = require("./models");

const app = express();

app.set("trust proxy", 1);

app.use(
  pino({
    name: "http",
    enabled: process.env.NODE_ENV !== "test",
  })
);
app.use(helmet());
app.use(hpp());
app.use(express.json());

const schema = Joi.object({
  name: Joi.string().required(),
});

app.get("/", async function getTodos(req, res, next) {
  try {
    const todos = await models.Todo.findAll();
    return res.json(todos);
  } catch (err) {
    return next(err);
  }
});

app.get("/:id", async function getTodo(req, res, next) {
  try {
    const todo = await models.Todo.findByPk(req.params.id);
    return res.json(todo);
  } catch (err) {
    return next(err);
  }
});

app.post("/", async function createTodo(req, res, next) {
  try {
    const payload = await schema.validateAsync(req.body);
    const todo = await models.Todo.create(payload);
    return res.status(201).json(todo);
  } catch (err) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  return res.status(500).json({ error: err.message });
});

module.exports = app;

# Simple REST api

This is a simple REST api which can create and store todos. It uses mariadb as the storage backend. This is a simple base app which can be used to start working with Continous Integration and Continous Deployment.

## Getting started

```sh
# Install dependencies
$ npm install
# Run the server
$ npm start
# Or watch for changes via nodemon
$ npm run dev
```

## Migrations

To migrate the database you can run the following command:

```sh
$ npm run migrate
```

## Tests

You can run the test suite with the following command

```sh
$ npm test
```

## Endpoints

```sh
# Create a todo
curl --request POST \
  --url http://localhost:3000/ \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Build docker container"
}'

# List all todos
curl --request GET \
  --url http://localhost:3000/

# Get todo by id
curl --request GET \
  --url http://localhost:3000/1
```

# Express.js boilerplate

A boilerplate for Express.js that can be used to develop your future apps in Node.js!

## Requirements

The application requires the following software installed on your machine. Other server versions should also work but the using the provided ones guarantees the application will start correctly.

- Node.js - `18.x.x`
- pnpm - `7.x`
- Docker - `20.x.x`
- Docker Compose - `2.15.x`

## Infrastructure components

- MySQL database - persistent application storage.
- Docker - used as runtime environment for application containers.

## Code components

- `Router` - it is responsible for persisting application paths and routing the traffic to the proper code component.
- `Controller` - a piece of code that keeps the logic of the application.
- `Repository` - handles sending queries to database.
- `Driver` - abstraction that allows using various DB solutions without any changes on Repository level.

## How to run

1. Pull the repository - `git clone git@github.com:elszczepano/expressjs-boilerplate.git && cd expressjs-boilerplate`.
2. Start the application - `docker-compose up --build`. If you run the application for the first time, containers will need to be pulled or built.
3. Visit `http://localhost:8000/hello` to confirm the application works correctly.

## Contribute

If you want to contribute do not hesitate to create an issue or a pull request!
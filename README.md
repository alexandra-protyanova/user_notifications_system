# NestJS Microservices Application

This project is a microservices-based application built using NestJS, RabbitMQ, Redis, PostgreSQL, and Docker. The application demonstrates how to create, schedule, and send notifications in a decoupled and scalable manner.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Services

- **User**: Create users, store them in PostgreSQL, and schedule notifications.
- **Scheduling**: Schedule tasks using Redis and RabbitMQ.
- **Notifications**: Send notifications via different channels (e.g., push notifications).

## Getting Started

- Install Dependencies: in every service
- Add your link to https://webhook.site/ to the `docker-compose` file
- And I suggest, making the delay less `user-service/src/welcomePushNotification/welcomePushNotification.service.ts`
- Start the project
  ```bash
  docker-compose up -d
- Create a user via Postman: `http://localhost:3000/users` only the `name` property is required

  

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

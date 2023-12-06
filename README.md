# Test SSE Project

This project demonstrates the implementation of Server-Sent Events (SSE) with a Node.js backend using Express, Sequelize for database interaction, and MySQL as the database. SSE allows the server to push real-time updates to the client over a single, long-lived HTTP connection.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Usage](#usage)
  - [Subscribe to SSE](#subscribe-to-sse)
  - [Consume Messages](#consume-messages)
  - [Add Message](#add-message)
- [Project Structure](#project-structure)

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/) (optional, for running MySQL in a Docker container)

## Running the Application

Make sure Docker is installed, and then execute the following commands:

    docker-compose up
    
This will start both the Node.js application and the MySQL container.

## Usage

### Subscribe to SSE

1. Open `public/index.html` in a browser.
2. Click the "Subscribe" button. This will create a subscription and display the subscription ID.

### Consume Messages

1. After subscribing, click the "Start SSE Connection" button.
2. The SSE connection will be established, and messages will be displayed in real-time.

### Add Message

1. Click the "Add Message" button in the browser to add a new message.
2. The new message will be sent to the server, and you should see it appear in the SSE messages.

## Project Structure

- **`src/index.ts`**: Express application setup and routes.
- **`src/sse-manager.ts`**: Server-Sent Events manager for handling subscriptions and messages.
- **`public/index.html`**: HTML file for the client-side interface.
- **`Dockerfile`**: Docker configuration for the Node.js application.
- **`docker-compose.yml`**: Docker Compose configuration for running both Node.js and MySQL containers.
- **`mysql-data`**: Volume for MySQL data persistence.


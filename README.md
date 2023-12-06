# SSE Demo

This repository contains a simple proof of concept (POC) application demonstrating the use of Server-Sent Events (SSE) with Node.js and Express.


## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Running the Application

  ```npm run build```
  ```npm start```

## Usage

### Subscribe to SSE

1. Open `public/index.html` in a browser.
2. Click the "Subscribe" button. This will create a subscription and display the subscription ID.

### Add Message

1. Click the "Add Message" button in the browser to add a new message.
2. The new message will be sent to the server, and you should see it appear in the SSE messages.

## Project Structure

- **`src/index.ts`**: Express application setup and routes.
- **`src/sse-manager.ts`**: Server-Sent Events manager for handling subscriptions and messages.
- **`public/index.html`**: HTML file for the client-side interface.


# number-classification-api

Number Classification API

Overview

The Number Classification API is a simple REST API that classifies numbers based on various mathematical properties. It checks if a number is prime, even/odd, Armstrong, and provides a fun fact using the Numbers API.

Features

Classifies a number as prime or not prime.

Determines if a number is even or odd.

Checks if a number is an Armstrong number.

Fetches a fun fact about the number from the Numbers API.

Tech Stack

Node.js with Express (Backend framework)

TypeScript (Type safety)

MongoDB (Database - optional, currently not in use)

Axios (Fetching external API data)

Cors (Handling cross-origin requests)

Dotenv (Environment variable management)

Installation

Prerequisites

Node.js (v16+ recommended)

MongoDB (optional)

Postman or Curl (for testing the API)

Steps to Set Up Locally

Clone the Repository

git clone https://github.com/your-username/number-classification-api.git
cd number-classification-api

Install Dependencies

npm install

Set Up Environment Variables
Create a .env file in the root directory and add:

PORT=5000
APP_NAME=Number Classification API

Run the API

npm start

Start in Development Mode (with Hot Reloading)

npm run dev

API Endpoints

1. Classify a Number

Endpoint: GET /api/classify-number

Query Parameter: number (required, integer)

Example Request:

curl "http://localhost:5000/api/classify-number?number=7"

Example Response:

{
"number": 7,
"is_prime": true,
"is_perfect": false,
"properties": ["odd", "armstrong"],
"digit_sum": 7,
"fun_fact": "7 is the number of days in a week."
}

2. Welcome Message

Endpoint: GET /

Response:

{
"message": "Welcome to my Number Classification API"
}

Testing

Using Postman

Open Postman and make a GET request to:

http://localhost:5000/api/classify-number?number=10

Using Jest and Supertest

Install testing dependencies:

npm install --save-dev jest supertest @types/jest @types/supertest

Run tests:

npm test

Deployment

The api is deployed on vercel

Author

Samson - GitHub

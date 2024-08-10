# Event Management API
This is a virtual event management platform focusing on user registration, event scheduling, and participant management. The system will feature secure user authentication, allowing users to register and log in using bcrypt for password hashing and JWT for session management.
Event management capabilities include creating, updating, and deleting event details, with each event storing information like date, time, description, and participant list in memory. These functionalities should be accessible only to authenticated and authorized users. Additionally, the system should allow users to register for events, and view, and manage their event registrations.
On successful registration of event, the user receive an email for the event with its details

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

 1. Clone the repository:

```bash
git clone https://github.com/Gagan3130/event-management-api.git
cd event-management-api
```
  2. Install dependencies:

```bash
npm install
```

   3. Create a .env file in the root directory with the following environment variables:

```bash
JWT_SECRET_KEY = YOUR_JWT_SECRET_KEY
MONGO_URI = MONGO_CONNECTION_STRING
EMAIL_USERNAME=YOUR_SMTP_USERNAME
EMAIL_PASSWORD=YOUR_SMTP_PASSWORD
EMAIL_HOST=EMAIL_HOST_NAME
EMAIL_PORT=EMAIL_PORT
EMAIL_FROM = YOUR_EMAIL
ADMIN_EMAIL = INITIAL_ADMIN_EMAIL
ADMIN_PASSWORD = INITIAL_ADMIN_PASSWORD
ADMIN_USERNAME = INITIAL_ADMIN_USERNAME
```

4. Start the server:

```bash
node app.js
```
The server will run on http://localhost:4000.

## API Endpoints

1. User Registration

    POST /api/users/signup

    Registers a new user.
    ```bash
    curl --location 'localhost:4000/api/users/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "name": "john weasley",
    "email": "john@gmail.com",
    "password": "abcde@123"
    }'
    ```
    Response:

    201 Created on success with user details and token

    4xx Bad Request if validation fails

    default role- attendees


2. User Login

    POST /api/users/login

    ```bash
   curl --location 'localhost:4000/api/users/login' \
   --header 'Content-Type: application/json' \
   --data-raw '{
    "email": "john@test.com",
    "password": "abcde@123"
   }'
    ```
   200 on successfull login with user details and token

   4xx Bad Request if validation fails

3. New Event Creation
   
    POST /api/events

    ```bash
    curl --location 'localhost:4000/api/events' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: ••••••' \
    --data '{
    "name": "new concert",
    "date": "2024-11-24",
    "time": "22:00",
    "description": "Get ready for this event"
    }'
   ```
   201 on successfull creation of new event with event details

   4xx Bad Request if validation fails
   403 if non-admin user tries to access this resource

4. Updating the event

    PUT /api/events/:eventId
    
    ```bash
    curl --location --request PUT 'localhost:4000/api/events/66b4432252f62d29b09f1391' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: ••••••' \
    --data '{
    "name": "karan aujla",
    "date": "2024-12-20",
    "time": "20:00",
    "description": "this is a live singing event"
    }'
    ```

    200 on successfull updating the event

   4xx Bad Request if validation fails
   403 if non-admin user tries to access this resource

5. User Event Registration

    POST /api/events/:evetnId/register

    ```bash
    curl --location --request POST 'localhost:4000/api/events/66b445b5e47708de7bf6813a/register' \
    --header 'Authorization: ••••••'
    ```
    200 on successfull register for event

   4xx Bad Request if validation fails

6. Event Details

    GET /api/events/:eventId

    ```bash
    curl --location 'localhost:4000/api/events/66b4432252f62d29b09f1391' \
    --header 'Authorization: ••••••'
    ```   
    200 on successfull retrieving the event details

   4xx Bad Request if validation fails

7. All Events list

    GET /api/events

    ```bash
    curl --location 'localhost:4000/api/events' \
    --header 'Authorization: ••••••'
    ```   
    200 on successfull retrieving the list of all events in the system

   4xx Bad Request if validation fails
   



    
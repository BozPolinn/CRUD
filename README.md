# CRUD API

**Before start**
Open project in IDE and run
    `npm i`.

App could be used to store list of users and manage it (create, get, update, delete single user and get list of users).
Users are stored locally during app works and look like:

    `{
        username: string;
        age: number;
        hobby: string[];
        id: string;
     }`.

All user fields are mandatory, and you should fill all fields while creating and updating single user.

**Start app**

`npm run start:dev` development mode implemented.

`npm run start:multi` partly implemented horizontal scaling.

**How to use**

1. After app started you could send requests.


2. For make requests you could use Postman.


3. For **CREATE USER**:

    Request: POST http://localhost:4002/api/users

    Body:
    `{
         "username": "Hanna",
         "age": 29,
         "hobby": ["cook", "code"]
     }`

    User ID would be added automatically.


4. For **UPDATE USER**:

   Request: PUT http://localhost:4000/api/users/id

   Body:
   `{
         "username": "Hanna1",
         "age": 290,
         "hobby": ["cook", "code"]
   }`


5. For **DELETE USER**:

   Request: DELETE http://localhost:4000/api/users/id


6. For **GET USER**

   Request: GET http://localhost:4000/api/users/id


7. For **GET USERS LIST**

   Request: GET http://localhost:4000/api/users


**TESTS**

To run tests use `npm run test` script
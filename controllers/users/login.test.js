const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

app.post("/api/users/login", login);

describe("login check", () => {
    // let server;
    beforeAll(()=> app.listen(3000));
    // afterAll(()=> app.disable());

    test("login check", async()=> {
       const response =  await request(app).post('/api/users/login').auth('example3@example.com', 'examplepassword');
        expect(response.status).toBe(200);     
    });

    test("check users email subscription", async()=> {
            const response =  await request(app).post("/api/users/login").auth('example3@example.com', 'examplepassword');
             const [users] = response.body;
             expect(typeof users.email).toBe("string");       
             expect(typeof users.subscription).toBe("string");     
              
    })
});
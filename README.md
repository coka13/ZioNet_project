
## **#1 Task**

**3 Microservices:**
1 - **DBservice** - Microservice to perform DB operations
2 - **completedTodos** - Microservice fetching all todos from DBservice and computing how many todos are completed and how many are incomplete
3 - **changeTodoStatus** - Microservice that gets id and status of a todo and sends a request to DBservice to update todo status (complete/incomplete)

**Added client interface where you can view live how many todos completed/incomplete, view the list of todos and option to change the status by pressing a button.**

**INSTRUCTIONS**
1. Run CreateDB.js to create the DB on MongoDB.
2. Start server on each microserver by running the command "npm start server".
3. If you want to use client interface start client by running the command "npm run dev"

**POSTMAN:**
**For computing how many todos are completed/incompled**

 1. Send http://localhost:3001/todos/stats GET request using POSTMAN.
 2.  Get results.

![](https://i.imgur.com/iznA2zI.png)
**For updating todo status**
1. Send http://localhost:3002/todos/status POST request using POSTMAN.
2. Get results.

![](https://i.imgur.com/8Onz5iL.png)
**CLIENT**
![Animated GIF](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjZmY2p0ZXhqMGp2eHR6bTBza2kzaTlyN2E5YTIwMnE0bTl4YmV1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QY4n7HKPYb39i9jjQZ/giphy.gif)

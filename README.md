


**3 Microservices:**
1 - **DBservice** - Microservice to perform DB operations
2 - **completedTodos** - Microservice fetching all todos from DBservice and computing how many todos are completed and how many are incomplete
3 - **changeTodoStatus** - Microservice that gets id and status of a todo and sends a request to DBservice to update todo status (complete/incomplete)

**Added client interface where you can view live how many todos completed/incomplete, view the list of todos and option to change the status by pressing a button.**

**INSTRUCTIONS**
 1.  Run from root folder for the first time:

    docker-compose down docker-compose up --build
   

 2.  If you already have all containers run this command:
 
    docker-compose up -d

 3.  You can run all containers from Docker Desktop:
 
 ![](https://i.imgur.com/7A8ZZwg.png)
 
 **Note that each time you re-run the app the DB is reset**

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

![Animated GIF](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXV0NmZhb2t4a3gxanF0Y3A3YWt3b3k0ZWx0dHdhN2VneWZ4MWlzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ukVeiweEdMedzssa1i/giphy.gif)

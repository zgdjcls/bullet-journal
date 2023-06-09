- [Installation](#installation)
- [Set up](#set-up)
  - [Frontend](#frontend)
    - [Frontend Structure](#frontend-structure)
  - [Backend](#backend)
  - [Database](#database)
- [Backend Documentation](#backend-documentation)
  - [createTask](#createtask)
  - [getDailyTask](#getdailytask)
  - [getSingleTask](#getsingletask)
  - [getAllTask](#getalltask)
- [Database Structure](#database-structure)
  - [Task](#task)
  - [User](#user)



# Installation
- frontend: npm
- backend: 
  - Node.js 
  - express.js
  - Database: MongoDB Atlas

# Set up

1. Clone the repo

```
 git clone https://github.com/UTSCCSCC01/finalprojects22-cyclist.git
```

2. go into this folder `cd finalprojects22-cyclist`

## Frontend
1. Enter the frontend directory `cd frontend/CycList`. 
1. Run `npm install` under this folder, to install necessary packages for frontend.
2. Run `npm start` under this folder to run Angular app. Now the app will be running at `http://localhost:4200/`.

### Frontend Structure
- Each frontend component is separated into Angular components: 
  - Main app layout: `app`
  - Add tasks: `add-task`
  - Task views: `dashboard`, `daily-log`, `monthly-log`, `future-log`
  - Navigation: `top-bar`, `side-bar`
  - Task format: `task`
- Main styles and SASS variables are in `styles.scss` and can be imported and used by components.
- Global variables and methods are in `globals` service and can be imported and used by components.

## Backend
1. Enter the backend directory `cd backend`.
2. Run `npm install` under this folder to install necessary packages for backend code.
3. Run `npm start` under this folder backend to start backend service. Now the backend should start at `http://localhost:3000`.

## Database
- Since we are using a cloud service, there is no need to install MongoDB.


# Backend Documentation
Since we are using graphQL as our api, it behaves little different from REST:

- All requests are sent to `localhost:3000/graphql` with the POST method and different function names inside the body of the request represent different usage.
- We can only throw errors in the handlers so all response statuses are generated by graphQL, `500` means there are some wrong inputs given by the user and `400` means the server doesn’t work.
- requests body should be like `query{emailLogin(email:”email”, password:”pass”){ userId}}`
- Function are listed in backend/api/schema, handlers than implement these functions should are listed in `backend/api/resolver`, data structures for mongoDB are listed in `backend/database`
- all functions with updating database should be put under mutation in the schema, the rest functions should be put under query

## createTask

- Description: user can create a new task through this function
- Body Parameters:
  - hierarchy: String //this field represent the task is daily, monthly log or future log
  - content: String
  - name: String
  - date: String
  - dueTime: String
- Expected Response:
  - 200 OK
    - create successfully
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

## getDailyTask

- Description: user can get their tasks for the given date, tasks include this day’s daily task, unfinished daily tasks from the day before this day, and repeated tasks on this day.
- Body Parameters:
  - day: Int
  - month: Int
  - year: Int
- Expected Response:
  - 200 OK
    - get all required tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.


## getSingleTask
- Description: user can get the details of the task with the given id.
- Body Parameters:
  - id: ID
- Expected Response:
  - 200 OK
    - get details of this task
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.


## getAllTask
- Description: user can get all of their tasks
- Body Parameters:
  - type: String  //user wants to get their daily task or monthly log….For now, it’s all
- Expected Response:
  - 200 OK
    - get all tasks
  - 400 Server error
    - Some error with the server, maybe MongoDB Altas is not running
  - 500 Input error
    - Invalid argument type.

# Database Structure

## Task
- creater(backend): ID
- day(frontend):int
- month(frontend):int
- year(frontend):int
- hierarchy(frontend):String //should be daily, monthly or future
- stratTime(frontend):int //the start time of this task
- expectedDuration(frontend): int
- repeatOrSingle(frontend):String //should be single or repeat
- dayWeekMonth(frontend): String //should be day, week or month
- frequency(frontend):String //if repeat on month or every n days, put the date or n; if repeat on week, e.g. every Mon, Wed and Fri, put 135 as string
- content(frontend):String

## User

- nickName: String
- email: String
- password: String


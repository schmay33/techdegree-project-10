# Full Stack - Course Library Application
 
 ![Main Page](/screenshot.png?raw=true "Main Page")

## Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
    - [Install Dependecies](#install-depencenies)
- [Starting the Application](#starting-the-application)


## Introduction

In this project, I used React to create a client for a school database REST API. The full stack application provies a way for users to administer a school database containing information about courses. 

Users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating and deleting courses in the database.

The client allwos users to create an account and sign in to make changes to the database.

## Getting Started

### Install Dependencies
1. Download Project File ZIP.
2. Extract ZIP file to desired location.
3. Navigate to extracted folder location `/api'.
4. To install dependencies, from the api folder run: 
```
npm install
``` 
5. If you would like to load the database with default info, from the api folder run: 
```
npm run seed
```
6. Navigate to the client folder location '/client'.
7. To install dependecies for the client, from the client folder run: 
```
npm install
```
---

## Starting the application


You will need two terminal windows. One pointed at the client folder and one at the api folder. 

From the api folder run `npm start` to start the REST API and begin listening on port `5000`.

From the client folder run `npm start` to start the React client. A new browser should open, if not navigate to [localhost:5000](http://localhost:3000).



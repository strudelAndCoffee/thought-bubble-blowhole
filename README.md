# Thought Bubble Blowhole

This project demonstrates functioning API routes for a social media app using a NoSQL database.

You can view the full walkthrough videos here: 

[Users and Thoughts demo](https://drive.google.com/file/d/1p1eTLF60LpsoZAaKBMA7V9R0m_sTqfys/view?usp=sharing)

[Reactions and Friends demo](https://drive.google.com/file/d/1e4eiQHBn6J27US4OcOjavS9jeIpzyqV4/view?usp=sharing)

## Table of Contents

- [Description](#description)
- [How to Install and Run Application](#how-to-install-and-run-application)
- [API Routes and Their Functions](#api-routes-and-their-functions)
- [Project Details](#project-details)
- [Credits](#credits)

## Description

Using API routes, a user can:
- Create/delete/update _User_ documents
- Create/delete/update _Thought_ documents that are associated with a unique user
- Add/remove _Friend_ subdocuments associated with a unique user to/from an existing user document
- Add/remove _Reaction_ subdocuments associated with a unique user to/from an existing thought document

### How to Install and Run Application

- Clone the repo to your computer
- Open GitBash or Terminal and naviagate to the root folder of the repo
- Type `npm install` to install the dependencies
- Then type `npm start` to start the server
- Use Insomnia or another API testing app to test the routes

## API Routes and Their Functions

USER Routes

`/api/users`
```
GET - no JSON body // gets all Users
POST - 'username' and 'email' fields required as JSON // creates a User
```
`/api/users/<User ID>`
```
GET - no JSON body // gets single User by ID
PUT - 'username' and/or 'email' fields required as JSON // updates single User's data by ID
DELETE - no JSON body // deletes a User by ID
```
`/api/users/<User ID>/friend`
```
PUT - 'friendId' field required as JSON // adds another User ('friedId') to 'friends' array of User by ID (<User ID>)
```
`/api/users/<User ID>/unfriend`
```
PUT - 'friendId' field required as JSON // removes another User ('friedId') from 'friends' array of User by ID (<User ID>)
```

THOUGHT Routes

`/api/thoughts`
```
GET - no JSON body // gets all Thoughts
POST - 'thoughtText' and 'username' fields required as JSON // creates a Thought and adds it to 'thoughts' array of User ('username')
```
`/api/thoughts/<Thought ID>`
```
GET - no JSON body // gets single Thought by ID
PUT - 'thoughtText' field required as JSON // updates single Thought's 'thoughtText' by ID
DELETE - no JSON body // deletes a Thought by ID
```
`/api/thoughts/<Thought ID>/reactions`
```
PUT - 'reactionBody' and 'username' fields required as JSON // creates a Reaction and adds it to 'reactions' array of Thought by ID 
```
`/api/thoughts/<Thought ID>/reactions/<Reaction ID>`
```
PUT - no JSON body // removes a Reaction (<Reaction ID>) from 'reactions' array of Thought by ID (<Thought ID>)
```

## Project Details

Technologies used:
- NodeJS
- expressJS
- MongoDB and Mongoose


User Story:
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Credits

This repository was created as a weekly challenge for The University of Texas at Austin Code Bootcamp: Full Stack Web Development course.

All code is original and authored by [strudelAndCoffee](https://github.com/strudelAndCoffee), except where cited.
# Thought Bubble Blowhole

This project demonstrates functioning API routes for a social media app using a NoSQL database.

You can view the full walkthrough videos here: 

[Users and Thoughts demo](https://drive.google.com/file/d/1p1eTLF60LpsoZAaKBMA7V9R0m_sTqfys/view?usp=sharing)

[Reactions and Friends demo](https://drive.google.com/file/d/16I5PV7IHIL-JGsIGM-dIHpSOQZPXuAti/view?usp=sharing)

## Description

Using API routes, a user can:
- Create/delete/update _User_ documents
- Create/delete/update _Thought_ documents that are associated with a unique user
- Add/remove _Friend_ subdocuments associated with a unique user to/from an existing user document
- Add/remove _Reaction_ subdocuments associated with a unique user to/from an existing thought document

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

Acceptance Criteria:
```
GIVEN a social network API

WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Credits

This repository was created as a weekly challenge for The University of Texas at Austin Code Bootcamp: Full Stack Web Development course.

All code is original and authored by [strudelAndCoffee](https://github.com/strudelAndCoffee), except where cited.
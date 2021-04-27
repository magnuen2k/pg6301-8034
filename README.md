# Exam Web Development and API Design

### Instructions to run the app
1. Run `npm install` to install dependencies.
2. Run `npm start` to start the application.
3. To access the application  type `http://localhost:3000` in your browser.
4. Run `npm test` to run all tests with coverage.

## User guide
This is a messaging application where users can either sign up with providing the app a username and password etc, or use Google to sign up/in.
The login system is using passport and are both authenticating and storing users in the backend.
* To sign up/in
* Send a message
* Reply to message
* Archive a message
* See your outbox
* Notifications for incoming messages
### Checklist
* .env file or just hardcoded client/secret id for google

## Functionality overview
* Anyone can sign up even without a google account and use the application fully.
* All users can chose who they want to message: supporting multiple people within the same message.
* All users can reply to a message if they got one.
* All users can delete any message that they have sent (not sure yet).
* Recipients will get a notification when they receive a message.
## Design choices
Instead of having logged in users creating new accounts to chat with, I decided to implement a more secure system where every individual user can sign up themselves (even without google) to use the messaging system.
*...explain about the database model and why i chose to model it like i did...*
*...explain about further possibilities using this data model (like a mail system with threads)...*
Explain technology choices functional components

## Shortcomings
* Form validation on sign up
Split application to microservices (simpler to not split for this small project)

## Candidate number
* 8034



User manual
Describe file structure and component?
Some components are heavily inspired by components shown in class
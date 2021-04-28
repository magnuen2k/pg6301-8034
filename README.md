# Exam Web Development and API Design

### Instructions to run the app

NOTE: To enable logging in with google you should normally supply your own client id and secret. These can be supplied by setting the following environment variables: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
In this application, it will use my client id and secret which should be sufficient to test the application.

1. Run `npm install` to install dependencies.
2. Run `npm start` to start the application.
3. To access the application  type `http://localhost:3000` in your browser.
4. Run `npm test` to run all tests with coverage.
    * Running my tests with full coverage should give about `72,6%`

When running the application, one can either authenticate with Google, sign up with a new Local user, or use any of these premade users:

    * username: test
    * password: test

    * username: test2
    * password: test


## Functionality overview
This is a messaging application where users can either sign up with providing the app a username and password etc, or use Google to sign up/in.
The login system is using passport and are both authenticating and storing users in the backend.
All navigation is done through the menu at the top. 
* To sign up/in:
    * Go to the sign in page. Here you have three choices:
        1. Sign in if you have an existing user.
        2. Sign in / up with Google.
        3. Sign up by clicking the sign up button and filling out the form.
        
* Send a message:
    * Go to inbox and click `send new message` and fill out the form and click send.
To select recipients you may either select a recipient from the dropdown or type the username in the input field, and then press the plus (+) button. All selected recipients are listet at the top of the form. It is not possible to remove recipients after they are added.
* Reply to message:
    * Go to inbox and click either `reply` or `reply all` below the message you want to reply to.
* Archive a message:
    * Go to inbox and click `delete` below the message you want to archive. The message is then removed from your inbox and put into your archive. (NOTE: This does not remove the message from the database)
* See your outbox:
    * Navigate to the outbox to see your sent messages.
* See your archive:
    * Navigate to the archive to see your deleted messages.
* Notifications for incoming messages:
    * Whenever you receive a message while being logged in, you will get a notification above the menu bar. The notification will be present for about 5 seconds, or until you either click it to go to your inbox or click X to remove it.

## Design choices
An important pillar for the application design is the database structure. I have divided this into three entities:
1. Users:
    * Stores information about all signed up users.
2. Messages:
    * Stores the actual messages sent including information about the sender and timestamp. 
3. Recipients:
    * Stores one row per recipient per message. This enables me to have a status on each message per recipient.

I use WebSockets to enable the server to notify the client. These WebSockets are created by the client and the client identifies itself by sending a first message on the WebSocket at login.

Instead of having logged in users creating new accounts to chat with, I decided to implement a more secure system where every individual user can sign up themselves. I have implemented use of Passport for authentication whether you use Google or create a Local user.

The client is developed using React with functional components, and built with parcel. The Server is built with Express.

## Further enhancements
My focus on the exam has been to make an application where the main functionality is already in place. There has been less focus on layout, styling and "nice-to-have" features.
The first things to enhance in this application is the following:
* Form validation on sign up.
* Form validation when composing a message.
* Not being able to choose same recipient multiple times.
* Additional fields such as subject, cc etc.
* Functionality for forwarding a message.
* Being able to add/remove recipients when composing or replying to a message.
* Being able to reply and forward a message from outbox or archive.
* Being able to un-delete a message from the archive.
* Styling

## Structure
1. Client:
    * The file structure on the client is very simple. All React components are in the `components` directory, custom hooks in `hooks`, http functions in `api` and React context in `contexts`.
2. Server:
    * Very simple and easy to understand. All storing of data and database service functions are in the `db` directory. Every route is in the `routes` directory, and all controllers are in the `controllers` directory.

Some of the components and custom hooks used in this exam is heavily inspired by code shown in class.

## Candidate number
* 8034
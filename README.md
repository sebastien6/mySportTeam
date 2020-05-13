# mySportTeam
Udacity Cloud Developer Capstone Project - Serverless

MyTeamSport is an application for coached or sport teacher allowing them to create their team(s) at each year or season, with associated players and games.


# Design and Web UI
Post authentication:
- a user can have one or more team associated to himself. 
- A team can have one or more player associated to the team
- A team can have one or more game associated to the team


![Alt text](images/design.png?raw=true "Data Design")

Player have to login to access the data. The home page is the Team page showing the teams associated to the user

![Alt text](images/teams-view.png?raw=true "teams view")

By clicking on a team, the user access the player and game related to that team and have the option to edit the team to change its data and upload a team picture as an option.

![Alt text](images/team-view.png?raw=true "team view")

![Alt text](images/edit-view.png?raw=true "edit team")

User can also create new players and games for that team from that view.

by clicking on a player or a game card, the user can access the player, or game data, edit them, upload an image or delete the player/game.

![Alt text](images/edit-player.png?raw=true "edit player")

when user click on save, the user is bring back to its previous screen.

# Rest API

Open the collection and environemnt file in the postman folder in your postman application to see the available API calls.

Note: use the web UI to generate a token by login into the app and update your postman enviroment with the updated token tu ensure successful API calls.

# How to run the app

to run the App, go in the client folder and run the command

```
yarn start // if you have yarn installed

or

npm run start

```


# How to test the app

to test the backend app locally, go in the backend folder and run the command:


```
sls offline start

```
the configuration for serverless offiline includes:
- offline-dynamodb
- offline-s3
- offline SNS

the postman collection file contain a folder for call to the offline API.
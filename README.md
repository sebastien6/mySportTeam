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

The postman folder contain a collection and environment files with available API calls online and offline.

Note: use the web UI to generate a token by login into the app and update your postman enviroment with the updated token tu ensure successful API calls.

## Team API

### Create a team

POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/teams

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Get all Teams

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/teams


### Get a team

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

### Update a team

PATCH https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Delete a team

DELETE https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

## Player API

### Create a player

POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/players

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Get all players

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/players


### Get a player

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

### Update a player

PATCH https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Delete a player

DELETE https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

## Game API

### Create a game

POST https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/games

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Get all games

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/games


### Get a game

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

### Update a game

PATCH https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

body example:
```
{
	"season": "2020",
	"name": "Team Red",
	"sport": "Baseball",
	"retired": false
}
```

### Delete a game

DELETE https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

## Attechmant URL API

### Get an attachment URL

GET https://{{apiId}}.execute-api.us-east-1.amazonaws.com/dev/attachment/{id}

base on the provided id, teamId, PlayerId, or GameId, the attachement is associated to the corresponding team, player or game.


# How to run the frontend app

to run the Frontend React UI App, go in the client folder and run the command

```
yarn start // if you have yarn installed

or

npm run start

```

Prerequisite:
- nodejs
- react
- yarn (optional)

# How to deploy the backen app under your own AWS account

to run the backen API under your own AWS account, go in the backend folder and run the command

```
sls deploy -v

```

Prerequisite:
- serverless
- nodejs
- AWS cli (configured)


# How to test the app

to test the backend app locally, go in the backend folder and run the command:


```
sls offline start

```

Prerequisite:
- serverless
- nodejs
- AWS cli (configured)

the configuration for serverless offline includes:
- offline-dynamodb
- offline-s3
- offline SNS

The postman folder contain a collection and environment files with available API calls online and offline.

Note: use the web UI to generate a token by login into the app and update your postman enviroment with the updated token tu ensure successful API calls.
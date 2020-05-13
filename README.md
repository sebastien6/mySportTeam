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

POST https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/teams

body example:
```
{
	"season": "2020",
	"name": "red team",
	"sport": "football",
	"retired": false
}
```

Response example:
```
{
    "item": {
        "PK": "google-oauth2|114715338908998513605",
        "SK": "team_142b4490-a7ef-420f-b2ee-62ad31b46a1f",
        "createdAt": "2020-05-13T22:43:00.418Z",
        "name": "red team",
        "sport": "football",
        "season": "2020",
        "retired": false
    }
}
```

### Get all Teams

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/teams

Response example:
```
{
    "items": [
        {
            "season": "2020",
            "createdAt": "2020-05-13T15:11:51.371Z",
            "SK": "team_5ebb9558-b35c-48f7-ae17-1b09151345e1",
            "PK": "google-oauth2|114715338908998513605",
            "name": "Blue team",
            "retired": false,
            "sport": "Volleyball"
        },
        {
            "season": "2019",
            "createdAt": "2020-05-13T15:11:36.800Z",
            "SK": "team_6f27d789-0d19-4d8b-946c-c4a8d48d1073",
            "PK": "google-oauth2|114715338908998513605",
            "name": "Blue Team",
            "retired": true,
            "sport": "Volleyball"
        },
        {
            "teamPicture": "https://seb6-mysportteam-images-dev.s3.amazonaws.com/e16d258a-dd47-4f16-85c4-e53dd99d4886",
            "season": "2019-2020",
            "createdAt": "2020-05-13T15:12:19.893Z",
            "SK": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
            "PK": "google-oauth2|114715338908998513605",
            "name": "Black team",
            "retired": false,
            "sport": "hockey"
        }
    ]
}
```

### Get a team

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

Response example:
{
    "team": {
        "season": "2019",
        "createdAt": "2020-05-13T15:11:36.800Z",
        "SK": "team_6f27d789-0d19-4d8b-946c-c4a8d48d1073",
        "PK": "google-oauth2|114715338908998513605",
        "name": "Blue Team",
        "retired": true,
        "sport": "Volleyball"
    }
}

### Get a team with all its players

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev//teams/{teamId}/players

Response example:
```
{
    "items": [
        {
            "playerPicture": "http://seb6-mysportteam-images-dev.s3.amazonaws.com/81b68cd4-2fa3-4c86-9fbd-035ac1c3e372",
            "lastName": "son of Glóin",
            "createdAt": "2020-05-13T15:35:52.473Z",
            "SK": "player_e68efbab-e34a-46f0-8772-89ee97a9d122",
            "GSI1": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
            "PK": "google-oauth2|114715338908998513605",
            "position": "defense",
            "firstName": "Gimly",
            "jerseyNumber": 39,
            "yearOfBirth": 1999
        }
    ]
}
```

### Get a team with all its games

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev//games/{teamId}/games

Response example:
```
```

### Update a team

PATCH https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

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

DELETE https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/teams/{teamId}

## Player API

### Create a player

POST https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/players

body example:
```
{
	"teamId": "team_6f27d789-0d19-4d8b-946c-c4a8d48d1073",
    "firstName": "Frodo",
    "lastName": "Baggins",
    "yearOfBirth": 2006,
    "jerseyNumber": 13,
    "position": "goalie"
}
```

Response example:
```
{
    "item": {
        "PK": "google-oauth2|114715338908998513605",
        "SK": "player_6e50ab34-0f16-4d96-9b49-3d18dfab755f",
        "GSI1": "team_6f27d789-0d19-4d8b-946c-c4a8d48d1073",
        "createdAt": "2020-05-13T22:50:40.681Z",
        "firstName": "Frodo",
        "lastName": "Baggins",
        "yearOfBirth": 2006,
        "position": "goalie",
        "jerseyNumber": 13
    }
}
```

### Get all players

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/players

Response example:
```
{
    "items": [
        {
            "playerPicture": "http://seb6-mysportteam-images-dev.s3.amazonaws.com/81b68cd4-2fa3-4c86-9fbd-035ac1c3e372",
            "lastName": "son of Glóin",
            "createdAt": "2020-05-13T15:35:52.473Z",
            "SK": "player_e68efbab-e34a-46f0-8772-89ee97a9d122",
            "GSI1": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
            "PK": "google-oauth2|114715338908998513605",
            "position": "defense",
            "firstName": "Gimly",
            "jerseyNumber": 39,
            "yearOfBirth": 1999
        }
    ]
}
```

### Get a player

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

Response example:
{
    "items": {
        "playerPicture": "http://seb6-mysportteam-images-dev.s3.amazonaws.com/81b68cd4-2fa3-4c86-9fbd-035ac1c3e372",
        "lastName": "son of Glóin",
        "createdAt": "2020-05-13T15:35:52.473Z",
        "SK": "player_e68efbab-e34a-46f0-8772-89ee97a9d122",
        "GSI1": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
        "PK": "google-oauth2|114715338908998513605",
        "position": "defense",
        "firstName": "Gimly",
        "jerseyNumber": 39,
        "yearOfBirth": 1999
    }
}

### Update a player

PATCH https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

body example:
```
{
	"teamId": "team_287d9159-69a0-4958-a413-b1b38f99fae7",
    "firstName": "Frodo",
    "lastName": "Baggins",
    "yearOfBirth": 2006,
    "jerseyNumber": 1,
    "position": "forward"
}
```

### Delete a player

DELETE https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/players/{playerId}

## Game API

### Create a game

POST https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/games

body example:
```
{
	"opponentTeam": "the warriors",
    "date": "2020-06-10",
    "location": "Rohan",
    "teamId": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
    "teamScore": 0,
    "opponentScore": 0
}
```

{
    "item": {
        "PK": "google-oauth2|114715338908998513605",
        "SK": "game_24a55aa0-42d5-4911-ad5f-8229b60ff351",
        "GSI1": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
        "createdAt": "2020-05-13T23:23:49.900Z",
        "opponentTeam": "the warriors",
        "opponentScore": 0,
        "teamScore": 0,
        "location": "Rohan",
        "date": "2020-06-10"
    }
}

### Get all games

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/games

Response example:
```
{
    "items": [
        {
            "opponentTeam": "mordor",
            "date": "2020-04-10",
            "location": "somewhere in middle earth",
            "gamePicture": "https://seb6-mysportteam-images-dev.s3.amazonaws.com/5100338c-9925-41aa-9136-678d4003585c",
            "createdAt": "2020-05-13T15:38:32.521Z",
            "SK": "game_a1d0f722-008e-45fd-80e5-af02548622cd",
            "GSI1": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
            "teamScore": 13,
            "PK": "google-oauth2|114715338908998513605",
            "opponentScore": 2
        }
    ]
}
```

### Get a game

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

### Update a game

PATCH https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

body example:
```
{
	"opponentTeam": "the warriors",
    "date": "2020-06-10",
    "location": "Rohan",
    "teamId": "team_721ec865-6f5e-4cc3-a463-66a5966dc8e5",
    "teamScore": 0,
    "opponentScore": 5
}
```

### Delete a game

DELETE https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/games/{gameId}

## Attachment URL API

### Get an attachment URL

GET https://{apiId}.execute-api.us-east-1.amazonaws.com/dev/attachment/{id}

base on the provided id, teamId, PlayerId, or GameId, the attachement is associated to the corresponding team, player or game.

Response example:
{
    "uploadUrl": "https://seb6-mysportteam-images-dev.s3.amazonaws.com/79b38486-5dc0-48a3-a24d-eef6479097c4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATQ2L7YIITQDADRP7%2F20200513%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200513T224749Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLWVhc3QtMSJHMEUCIQCtTld%2B44zf4E%2BmSwUWLBuzjYn%2FjiXjUODAbs3jk6XIQgIgAtg374K9oBAbvJXe5Uo3VEcfJyt0KxpMeFWDLXtmbK0q4AEIaBAAGgwyNDIyODgxNDkwMDkiDJ5DonN9kwwXtGhGGSq9ATbtMTb4ofEnTGnTI1mxhZt%2BbgSlmOoYzf1Zgz2UbU5T78iAIZzwHMs1oYDb7anl0dF%2F7564CeouksSZKo87HbhqzOPjrM3BVFHnwhevclTdPE1qp8EI3JE0E4ysUcwraREk3y4ZAm5cIBoSbiVKGQsQnhBpzDOWHErofxdZWs6irkJ0saxcFBxmndAiCYlGa4e9Gw19G8LYbrdnWsB%2B7XAERiS7B4m1phixEa%2BBdpADW6WHwTP0d0rf%2By5zzTCS8vH1BTrgAfvGoUL1z6Dbl27TXU2CAmdLMiYgC7T1ysFDpbQuikoOTAoDTv9T6Bcf3zHAMznHU3BAVK8VUQ3pJ2NO%2FcTLYNu%2BNNpeYvgr0XclxAbZoM48z3%2B5nkc69y8rofIVZWW36rJhDzTqJXi2cfLyAhLqPScDmqRbN%2Bmt%2Bs51s605c4zMMvRwvbVBycSQgy%2F8%2FE6yVDA%2Fsx1bJPmr5Y8p98Rg%2BRlT0zdi6V88FBVQYzCMeFKInx%2Bjk6IMD%2Fal%2BUfqEvKqm3AuQELrpwbmVb3Ft9LOvO90Rgw7qlO7Zo%2Fu%2Fmw%2BtHkq&X-Amz-Signature=d0ca80f85fd5a643785c73732daaf8951f5939ff515b214bbe5bdac38b4d9b97&X-Amz-SignedHeaders=host"
}


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

when using the offline version, the backend/seed.json will be used to automatically inject data in the offline dynamodb. The offline dynamodb is setup to run in memory and all its data will be deleted when the offline service will be stopped. 

the offline dynamodb, sns and s3 services are automatically started and stopped with the offline serverless service.

The postman folder contain a collection and environment files with available API calls online and offline.

Note: use the web UI to generate a token by login into the app and update your postman enviroment with the updated token tu ensure successful API calls.
# Sportsbook user

In sportsbook exists two types of users
* Player
* Bookmaker 


User contains 
* [model](../../classes/Player.html)
* [model](../../classes/Bookmaker.html)
* [model](../../classes/PlayerDebt.html)


user Actions
* [UpdatePlayerAction](../../classes/UpdatePlayerAction.html) - updates user object if token is valid - `[USER]_UPDATE_PLAYER`
* [UpdateUserTokenAction](../../classes/UpdateUserTokenAction.html) - update user token - `[USER]_UPDATE_USER_TOKEN`
* [TokenValidateFailureAction](../../classes/TokenValidateFailureAction.html) - sets an error message - `[USER]_TOKEN_VALIDATE_FAILURE`

user Selectors
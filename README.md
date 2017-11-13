# steamapi-node
a Node.js wrapper for the Steam Api.

## Information
this is a fork of [node-steamapi](https://github.com/lloti/node-steamapi) where i only refactored the code to be more Object Oriented aswell as fixed little stuff with JSDocs as example and used snekfetch for the http requests

also it is fully documented with JsDocs

## Usage

to use above mentioned Classes you just need to call the class name on the SteamUser instance and then the method name like shown below

Examples:

```js
const { SteamUser } = require('steamapi-node');
const steam = new SteamUser("YOUR STEAM API KEY HERE");

steam.others.resolve('/profiles/76561198334532819/').then(id => {
    // handle returned data
    steam.users.getUserFriends(id).then(result => {
        // handle more returnded data
    })
})
```

or with async/await

```js
const { SteamUser } = require('steamapi-node');
const steam = new SteamUser("YOUR STEAM API KEY HERE");

const getFriends = async input => {
    const id = await steam.others.resolve(input);
    const friends = await steam.users.getUserFriends(id);
    return friends
}
getFriends('/profiles/76561198334532819/').then(result => {
    // handle returned data
});
```

if you only need specific endpoint groups as example you can do this

```js
const { SteamUser, Others } = require('steamapi-node');
const steam = new SteamUser("YOUR STEAM API KEY HERE", {}, [Others]);

steam.others.resolve('/profiles/76561198334532819/').then(result => {
    // handle returned data
})
```
## Methods overview

### Others
* resolve(info)
* get(path)
* getAppList()
* getFeaturedCategories()
* getServers(ip)

### Games

* getFeaturedGames()
* getGameAchievements(app)
* getGameDetails(app)
* getGameNews(app)
* getGamePlayers(app)
* getGameSchema(app)

### Users

* getUserAchievements(id, app)
* getUserBadges(id)
* getUserBans(id)
* getUserFriends(id)
* getUserGroups(id)
* getUserLevel(id)
* getUserOwnedGames(id)
* getUserRecentGames(id)
* getUserServers([key])
* getUserStats(id, app)
* getUserSummary(id)

# steamapi-node
a Node.js wrapper for the Steam Api.

## Information
this is a fork of [node-steamapi](https://github.com/Dev-Yukine/node-steamapi) where i only refractored the code to be more Object Oriented aswell as fixed little stuff and used snekfetch for the http requests

also it is fully documented with JsDocs

## Example Usage

```js
const { SteamUser } = require('steamapi-node');
const steam = new SteamUser("YOUR STEAM API KEY HERE");

steam.others.resolve('/profiles/76561198334532819/').then(id => {
    // handle returned data
    steam.users.getUserFriends(id).then(date => {
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
getFriends('/profiles/76561198334532819/');
```

if you only need specific endpoints from as example 
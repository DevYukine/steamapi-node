const Games = require('./Endpoints/Games.js');
const Users = require('./Endpoints/Users.js');
const Others = require('./Endpoints/Others.js');
const EndpointClass = require('./Endpoints/Endpoint.js');

module.exports = class SteamUser {
	/**
	 * Create a SteamUser Class to interact with the SteamApi
	 * @class
	 * @param {string} key Steam key
	 * @param {Object} [cacheOptions={}] Optional options for caching `getGameDetails()`
	 * @param {boolean} [cacheOptions.enabled=true] Whether to cache or not
	 * @param {number} [cacheOptions.expires=86400000] How long cache should last for (ms) [1 day by default]
	 * @param {Array<Endpoints>} [endpoints = [endpoints]] An Array of all endpoint groups that this SteamUser should have acess to. [all endpoint groups by default]
	 */
	constructor(key, cacheOptions = {}, endpoints = [Games, Users, Others]) {
		if (!key) throw new Error('no key provided | some methods may not work | go get one > https://goo.gl/DfNy5s');
		this.options = {
			enabled: cacheOptions.enabled !== false,
			expires: cacheOptions.expires || 86400000
		};
		if (endpoints.some(endpoint => !(endpoint.prototype instanceof EndpointClass))) throw Error('The endpoint array only accept Classes that extend the Endpoint Class.');
		for (const Endpoint of endpoints) {
			const instance = new Endpoint(key, this.options);
			this[instance.group] = instance;
		}
	}
};

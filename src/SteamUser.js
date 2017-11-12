const Games = require('./Endpoints/Games.js');
const Users = require('./Endpoints/Users.js');
const Others = require('./Endpoints/Others.js');
const Endpoint = require('./Endpoints/Endpoint.js');

module.exports = class SteamUser {
	/**
	 * Create a SteamUser Class to interact with the SteamApi
	 * @param {string} key Steam key
	 * @param {Object} [cache={}] Optional options for caching `getGameDetails()`
	 * @param {boolean} [cache.enabled=true] Whether to cache or not
	 * @param {number} [cache.expires=86400000] How long cache should last for (ms) [1 day by default]
	 * @param {Array<Endpoints>} [endpoints = []] An Array of all endpoint groups that this SteamUser should have acess to. [all endpoint groups by default]
	 */
	constructor(key, cache = {}, endpoints = [Games, Users, Others]) {
		if (!key) throw new Error('no key provided | some methods may not work | go get one > https://goo.gl/DfNy5s');
		this.options = {
			enabled: cache.enabled !== false,
			expires: cache.expires || 86400000
		};
		if (endpoints.some(endpoint => !(endpoint.prototype instanceof Endpoint))) throw Error('The endpoint array only accept Endpoint Classes.');
		for (let i = 0; i < endpoints.length; i++) {
			const instance = new endpoints[i](key, this.options);
			this[instance.group] = instance;
		}
	}
};

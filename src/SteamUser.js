const Games = require('./Endpoints/Games.js');
const Users = require('./Endpoints/Users.js');
const Others = require('./Endpoints/Others.js');

module.exports = class SteamUser {
	/**
	 * Create a SteamUser Class to interact with the SteamApi
	 * @class
	 * @param {string} key Steam key
	 * @param {Object} [cacheOptions={}] Optional options for caching `getGameDetails()`
	 * @param {boolean} [cacheOptions.enabled=true] Whether to cache or not
	 * @param {number} [cacheOptions.expires=86400000] How long cache should last for (ms) [1 day by default]
	 * @param {Array<String>} [disabledEndpoints = []] An Array of all endpoint groups that this SteamUser should ignore. [none by default]
	 */
	constructor(key, cacheOptions = {}, disabledEndpoints = []) {
		if (!key) throw new Error('no key provided | some methods may not work | go get one > https://goo.gl/DfNy5s');

		this.options = {
			enabled: cacheOptions.enabled !== false,
			expires: cacheOptions.expires || 86400000
		};

		if (disabledEndpoints.length > 0 && !disabledEndpoints.some(element => !/others|users|games/.test(element))) throw new Error('You Provided a wrong event to disable');
		this.others = new Others(key, cacheOptions);
		this.users = new Users(key, cacheOptions);
		this.games = new Games(key, cacheOptions);

		if (disabledEndpoints > 1) {
			for (const endpoint of disabledEndpoints) {
				delete this[endpoint];
			}
		}
	}
};

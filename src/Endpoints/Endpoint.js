const { version } = require('../../package.json');

module.exports = class Endpoint {
	/** Creates a Endpoint Class
	 * @param {string} key the acess token to interact with the Steam Api
	 * @param {Object} options the caching options of the SteamUser
	**/

	constructor(key, options) {
		this.baseURL = 'https://api.steampowered.com';
		this.key = key;
		this.headers = { 'User-Agent': `SteamAPI/${version} https://github.com/Dev-Yukine/steamapi-node` };
		this.options = options;
		if (this.options.enabled) this.cache = new Map();
	}
};

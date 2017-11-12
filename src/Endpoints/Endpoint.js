const { version } = require('../../package.json');

module.exports = class Endpoint {
	/** Creates a Endpoint Class
	 * @param {string} key the acess token to interact with the Steam Api
	 * @param {string} group the name of this api endpoint group
	 * @param {Object} options the caching options of the SteamUser
	**/

	constructor(key, group, options) {
		this.baseURL = 'https://api.steampowered.com';
		this.key = key;
		this.headers = { 'User-Agent': `SteamAPI/${version} https://github.com/Dev-Yukine/steamapi-node` };
		this.group = group;
		this.options = options;
		if (this.options.enabled) this.cache = new Map();
	}
};

const Endpoint = require('./Endpoint.js');
const { get } = require('snekfetch');
const { parse } = require('url');

module.exports = class OtherEndpoints extends Endpoint {
	/**
	 * Creates a OtherEndpoints Class
	 * @param {string} key the acess token to interact with the Steam Api
	 * @param {Object} options the caching options of the SteamUser
	 * @extends {Endpoint}
	 */

	/**
	 * Get custom path that isn't in SteamAPI
	 * @param {string} path Path to request e.g '/IPlayerService/GetOwnedGames/v1?steamid=76561198378422474'
	 * @returns {Promise<Object>} Response
	 */
	get(path) {
		return get(`${this.baseURL}${path}${path.includes('?') ? '&' : '?'}key=${this.key}`, { headers: this.headers });
	}

	/**
	 * Resolve info based on id|profile|url
	 * @async
	 * @param {string} info Something to resolve e.g 'https://steamcommunity.com/id/xDim'
	 * @returns {Promise<string>} Profile ID
	 */
	async resolve(info) {
		if (!info) throw new Error('no info provided');
		let steamID, steamURL;
		if (/^(?:\/?profiles\/)?\d{17}.*$/.test(info)) {
			steamID = info.replace(/^(?:\/?profiles\/)?(\d{17}).*$/, '$1');
		} else if (/^(?:\/?id\/)?\w{2,32}.*$/.test(info)) {
			steamURL = info.replace(/^(?:\/?id\/)?(\w{2,32}).*$/, '$1');
		} else {
			const url = parse(info);
			if (url.hostname === 'steamcommunity.com') {
				if (url.path.startsWith('/id/')) {
					steamURL = url.path.replace(/\/id\//, '');
				} else if (url.path.startsWith('/profiles/')) {
					steamID = url.path.replace(/\/profiles\//, '');
				} else {
					throw new Error('Invalid profile link/id');
				}
			}
		}
		if (steamURL) {
			const { body, ok } = await get(`${this.baseURL}/ISteamUser/ResolveVanityURL/v1?key=${this.key}&vanityurl=${steamURL}`, { headers: this.headers });
			if (ok) {
				steamID = body.response.steamid;
			} else {
				throw new Error('Invalid profile link/id');
			}
		}
		if (!steamID) throw new Error('Can\'t resolve info to an ID');
		return steamID;
	}

	/**
	 * Get every single app on steam
	 * @async
	 * @returns {Promise<Array<Object>>} Objects consisting of appid and name
	 */
	async getAppList() {
		const { body } = await get(`${this.baseURL}/ISteamApps/GetAppList/v2`, { headers: this.headers });
		return body.applist.apps;
	}

	/**
	 * Get featured categories on the steam store
	 * @async
	 * @returns {Promise<Object>} Featured categories
	 */
	async getFeaturedCategories() {
		const { body } = await get('https://store.steampowered.com/api/featuredcategories', this.headers);
		return Object.values(body);
	}
	/**
	 * Get every server associated with host
	 * @async
	 * @param {string} host Host to request
	 * @returns {Promise<Array<Object>>} Objects consisting of server info
	 */
	async getServers(host) {
		if (!host) throw new Error('no host provided');
		const { body } = await get(`${this.baseURL}/ISteamApps/GetServersAtAddress/v1?addr=${host}`, this.headers);
		if (!body.response.success) throw new Error('invalid host');
		return body.response.servers.map(server => ({
			address: server.addr,
			appID: server.appid,
			game: server.gamedir,
			gmsindex: server.gmsindex,
			lan: server.lan,
			port: server.gameport,
			region: server.region,
			secure: server.secure,
			specPort: server.specPort
		}));
	}
};

const Endpoint = require('./Endpoint.js');
const { get } = require('snekfetch');

module.exports = class GameEndpoints extends Endpoint {
	/**
	 * Creates a GameEndpoints Class
	 * @param {string} key the acess token to interact with the Steam Api
	 * @param {Object} options the caching options of the SteamUser
	 * @extends {Endpoint}
	 */
	constructor(key, options) {
		super(key, 'games', options);
	}

	/**
	 * Get featured games on the steam store
	 * @async
	 * @returns {Promise<Object>} Featured games
	 */
	async getFeaturedGames() {
		const { body } = await get('https://store.steampowered.com/api/featured', { headers: this.headers });
		return body;
	}

	/**
	 * Get achievements for app id
	 * @async
	 * @param {string} app App ID
	 * @returns {Promise<Array<string>>} App achievements for ID
	 */
	async getGameAchievements(app) {
		if (isNaN(app)) throw new Error('There isn\'t a App ID defined.');
		const { body } = await get(`${this.baseURL}/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2?gameid=${app}`, { headers: this.headers });
		return body.achievementpercentages.achievements;
	}

	/**
	 * Get details for App ID!
	 * @async
	 * <warn>Requests for this endpoint are limited to 200 every 5 minutes</warn>
	 * @param {string} app App ID
	 * @param {boolean} force Overwrite cache
	 * @returns {Promise<Object>} App details for ID
	 */
	async getGameDetails(app, force) {
		if (isNaN(app)) throw new Error('There isn\'t a App ID defined.');
		app = app.toString();
		if (this.options.enabled) {
			if (force || (this.cache.has(app) && this.cache.get(app).expires <= Date.now()) || !this.cache.has(app)) {
				const { body } = await get(`https://store.steampowered.com/api/appdetails?appids=${app}`, { headers: this.headers });
				if (!body[app].success) throw new Error('no app found');
				this.cache.set(app, {
					data: body[app].data,
					expires: Date.now() + this.options.expires
				});
			}
		} else {
			const { body } = await get(`https://store.steampowered.com/api/appdetails?appids=${app}`, { headers: this.headers });
			if (!body[app].success) throw new Error('No App ID found.');
			return body[app].data;
		}
		return this.cache.get(app).data;
	}

	/**
	 * Get news for app id
	 * @async
	 * @param {number} app App ID
	 * @returns {Promise<Array<Object>>} App news for ID
	 */
	async getGameNews(app) {
		if (isNaN(app)) throw new Error('There isn\'t a App ID defined.');
		const { body } = await get(`${this.baseURL}/ISteamNews/GetNewsForApp/v2?appid=${app}`, { headers: this.headers });
		if (body.appnews.count === 0) throw new Error('No news found for App ID!');
		return body.appnews.newsitems;
	}

	/**
	 * Get number of current players for app id
	 * @async
	 * @param {number} app App ID
	 * @returns {Promise<number>} Number of players
	 */
	async getGamePlayers(app) {
		if (isNaN(app)) throw new Error('There isn\'t a App ID defined.');
		const { body } = await get(`${this.baseURL}/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${app}`, { headers: this.headers });
		if (body.response.result !== 1) throw new Error('That was an invalided ID.');
		return body.response.player_count;
	}

	/**
	 * Get schema for app id
	 * @async
	 * @param {number} app App ID
	 * @returns {Promise<number>} Schema
	 */
	async getGameSchema(app) {
		if (isNaN(app)) throw new Error('There isn\'t a App ID defined.');
		const { body } = await get(`${this.baseURL}/ISteamUserStats/GetSchemaForGame/v2?key=${this.key}&appid=${app}`, { headers: this.headers });
		if (!body.game) throw new Error('Game not found.');
		return body.game;
	}
};

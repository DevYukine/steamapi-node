const Endpoint = require('./Endpoint.js');
const { get } = require('snekfetch');

module.exports = class UserEndpoints extends Endpoint {
	/**
	 * Creates a UserEndpoints Class
	 * @param {string} key the acess token to interact with the Steam Api
	 * @param {Object} options the caching options of the SteamUser
	 * @extends {Endpoint}
	 */
	constructor(key, options) {
		super(key, 'users', options);
		this.idReg = /^\d{17}$/;
	}

	/**
	 * Get users achievements for app id
	 * @async
	 * @param {string} id User ID
	 * @param {string} app App ID
	 * @returns {Promise<Object>} Achievements
	 */
	async getUserAchievements(id, app) {
		if (!this.idReg.test(id)) throw new Error('no user id provided');
		if (isNaN(app)) throw new Error('no appid provided');
		const { body } = await get(`${this.baseURL}/ISteamUserStats/GetPlayerAchievements/v1?key=${this.key}&steamid=${id}&appid=${app}`, this.headers);
		const stats = body.playerstats;
		if (!stats.success) throw new Error('error getting achievements');
		return {
			gameName: stats.gameName,
			steamID: stats.steamID,
			achievements: stats.achievements.map(achievement => ({
				api: achievement.apiname,
				achieved: !!achievement.achieved,
				unlockTime: achievement.unlocktime
			}))
		};
	}

	/**
	 * Get users badges
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Array<Object>>} Badges
	 */
	async getUserBadges(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/IPlayerService/GetBadges/v1?key=${this.key}&steamid=${id}`, this.headers);
		return body.response.badges.map(badge => ({
			appID: badge.appid,
			badgeID: badge.badgeid,
			borderColor: badge.border_color,
			communityItemID: badge.communityitemid,
			completionTime: badge.completion_time,
			level: badge.level,
			scarcity: badge.scarcity,
			xp: badge.xp
		}));
	}

	/**
	 * Get users bans
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Object>} Ban info
	 */
	async getUserBans(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/ISteamUser/GetPlayerBans/v1?key=${this.key}&steamids=${id}`, this.headers);
		const ban = body.players[0];
		return {
			communityBanned: ban.CommunityBanned,
			daysSinceLastBan: ban.DaysSinceLastBan,
			economyBan: ban.EconomyBan,
			numberOfVACBans: ban.NumberOfVACBans,
			numberOfGameBans: ban.NumberOfGameBans,
			steamID: ban.SteamID,
			VACBanned: ban.VACBanned
		};
	}

	/**
	 * Get users friends
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Array<Object>>} Friends
	 */
	async getUserFriends(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/ISteamUser/GetFriendList/v1?key=${this.key}&steamid=${id}`, this.headers);
		return body.friendslist.friends.map(friend => ({
			steamID: friend.steamid,
			relationship: friend.relationship,
			friendSince: friend.friend_since
		}));
	}

	/**
	 * Get users groups
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Array<string>>} Groups
	 */
	async getUserGroups(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/ISteamUser/GetUserGroupList/v1?key=${this.key}&steamid=${id}`, this.headers);
		if (!body.response.success) throw new Error('failed');
		return body.response.groups.map(group => group.gid);
	}

	/**
	 * Get users level
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<number>} Level
	 */
	async getUserLevel(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/IPlayerService/GetSteamLevel/v1?key=${this.key}&steamid=${id}`, this.headers);
		return body.response.player_level;
	}

	/**
	 * Get users owned games
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Array<Object>>} Owned games
	 */
	async getUserOwnedGames(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/IPlayerService/GetOwnedGames/v1?key=${this.key}&steamid=${id}`, this.headers);
		return body.response.games.map(game => ({
			appID: game.appid,
			playTime: game.playtime_forever,
			playTime2: game.playtime_2weeks || null
		}));
	}

	/**
	 * Get users recent games
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Array<Object>>} Recent games
	 */
	async getUserRecentGames(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/IPlayerService/GetRecentlyPlayedGames/v1?key=${this.key}&steamid=${id}`, this.headers);
		return body.response.games.map(game => ({
			appID: game.appid,
			logoURL: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`,
			name: game.name,
			iconURL: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`,
			playTime: game.playtime_forever,
			playTime2: game.playtime_2weeks
		}));
	}

	/**
	 * Gets servers on steamcommunity.com/dev/managegameservers using your key or provided key
	 * @async
	 * @param {string} [key=this.key] Key
	 * @returns {Promise<Object>} Servers
	 */
	async getUserServers(key = this.key) {
		const { body } = await get(`${this.baseURL}/IGameServersService/GetAccountList/v1?key=${key}`, this.headers);
		console.log(require('util').inspect(body));
		const { response } = body;
		return response;
	}

	/**
	 * Get users stats for app id
	 * @async
	 * @param {string} id User ID
	 * @param {string} app App ID
	 * @returns {Promise<Object>} Stats for app id
	 */
	async getUserStats(id, app) {
		if (!this.idReg.test(id)) throw new Error('no user id provided');
		if (isNaN(app)) throw new Error('no appid provided');
		const { body } = await get(`${this.baseURL}/ISteamUserStats/GetUserStatsForGame/v2?key=${this.key}&steamid=${id}&appid=${app}`, this.headers);
		if (!body.playerstats) throw new Error('game not found for user');
		return body.playerstats;
	}

	/**
	 * Get users summary
	 * @async
	 * @param {string} id User ID
	 * @returns {Promise<Object>} Summary
	 */
	async getUserSummary(id) {
		if (!this.idReg.test(id)) throw new Error('no id provided');
		const { body } = await get(`${this.baseURL}/ISteamUser/GetPlayerSummaries/v2?key=${this.key}&steamids=${id}`, this.headers);
		const player = body.response.players[0];
		if (!player) throw new Error('invalid id');
		return {
			avatar: {
				small: player.avatar,
				medium: player.avatarmedium,
				large: player.avatarfull
			},
			commentPermission: player.commentpermission,
			created: player.timecreated,
			lastLogOff: player.lastlogoff,
			nickname: player.personaname,
			personaState: player.personastate,
			personaStateFlags: player.personastateflags,
			primaryGroupID: player.primaryclanid,
			profileState: player.profilestate,
			profileURL: player.profileurl,
			steamID: player.steamid,
			visibilityState: player.communityvisibilitystate
		};
	}
};

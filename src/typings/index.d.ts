declare module 'steamapi-node'{

	export class SteamUser {
		constructor(key: String, cacheOptions: {
			enabled: boolean,
			expires: number
		}, endpoints: [GameEndpoints, UserEndpoints, OtherEndpoints])

		public options: {
			enabled: Boolean,
			expires: Number
		};
		
		public others?: OtherEndpoints
		public games?: GameEndpoints
		public users?: UserEndpoints
	}

	export class GameEndpoints extends Endpoint {
		constructor(key: String, options: {
			enabled: Boolean,
			expires: Number   
		})

		public getFeaturedGames(): Promise<Object>

		public getGameAchievements(app: String): Promise<Array<String>>

		public getGameDetails(app: String, force: Boolean): Promise<Object>

		public getGameNews(app: String): Promise<Array<Object>>

		public getGamePlayers(app: String): Promise<Number>

		public getGameSchema(app: String): Promise<Number>
	}

	export class UserEndpoints extends Endpoint {
		constructor(key: String, options: {
			enabled: Boolean,
			expires: Number   
		})

		public idReg: RegExp

		public getUserAchievements(id: String, app: String): Promise<Object>

		public getUserBadges(id: String): Promise<Array<Object>>

		public getUserBans(id: String): Promise<Object>

		public getUserFriends(id: String): Promise<Array<Object>>

		public getUsersGroup(id: String): Promise<Array<Object>>

		public getUserLevel(id: String): Promise<Number>

		public getUserOwnedGames(id: String): Promise<Array<Object>>

		public getUserRecentGames(id: String): Promise<Array<Object>>

		public getUserServers(key: String): Promise<Object>

		public getUserStats(id: String, app: String): Promise<Object>

		public getUserSummary(id: String): Promise<Object>
	}

	export class OtherEndpoints extends Endpoint {
		constructor(key: String, options: {
			enabled: Boolean,
			expires: Number   
		})

		public get(path: String): Promise<Object>

		public resolve(info: string): Promise<String>

		public getAppList(): Promise<Array<Object>>

		public getFeaturedCategories(): Promise<Object>

		public getServers(host: String): Promise<Array<Object>>
	}

	class Endpoint {
		constructor(key: String, group: String, options: {
			enabled: Boolean,
			expires: Number   
		})

		public baseURL: String
		public key: String
		public headers: {
			'User-Agent': String
		}
		public group: String
		public options: {
			enabled: Boolean,
			expires: Number  
		}
		public cache?: Map<String, {
			date: Object
			expires: number
		}>


	}

}
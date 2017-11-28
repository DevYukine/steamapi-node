declare module 'steamapi-node'{

	export class SteamUser {
		constructor(key: string, cacheOptions: cacheOptions, disabledEndpoints: Array<string>)

		public options: cacheOptions
		
		public others?: OtherEndpoints
		public games?: GameEndpoints
		public users?: UserEndpoints
	}

	class GameEndpoints extends Endpoint {
		constructor(key: string, options: cacheOptions)

		public getFeaturedGames(): Promise<Object>

		public getGameAchievements(app: string): Promise<Array<string>>

		public getGameDetails(app: string, force: Boolean): Promise<Object>

		public getGameNews(app: string): Promise<Array<Object>>

		public getGamePlayers(app: string): Promise<number>

		public getGameSchema(app: string): Promise<number>
	}

	class UserEndpoints extends Endpoint {
		constructor(key: string, options: cacheOptions)

		public idReg: RegExp

		public getUserAchievements(id: string, app: string): Promise<Object>

		public getUserBadges(id: string): Promise<Array<Object>>

		public getUserBans(id: string): Promise<Object>

		public getUserFriends(id: string): Promise<Array<Object>>

		public getUsersGroup(id: string): Promise<Array<Object>>

		public getUserLevel(id: string): Promise<number>

		public getUserOwnedGames(id: string): Promise<Array<Object>>

		public getUserRecentGames(id: string): Promise<Array<Object>>

		public getUserServers(key: string): Promise<Object>

		public getUserStats(id: string, app: string): Promise<Object>

		public getUserSummary(id: string): Promise<Object>
	}

	class OtherEndpoints extends Endpoint {
		constructor(key: string, options: cacheOptions)

		public get(path: string): Promise<Object>

		public resolve(info: string): Promise<string>

		public getAppList(): Promise<Array<Object>>

		public getFeaturedCategories(): Promise<Object>

		public getServers(host: string): Promise<Array<Object>>
	}

	class Endpoint {
		constructor(key: string, options: cacheOptions)

		public baseURL: string
		public key: string
		public headers: {
			'User-Agent': string
		}
		public options: cacheOptions
		public cache?: Map<string, cache>
	}

	type cache = {
		date: Object
		expires: number
	}

	type cacheOptions = {
		enabled: boolean,
		expires: number 
	}
}
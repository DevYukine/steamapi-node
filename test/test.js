const { SteamUser } = require('..');
const steam = new SteamUser(process.env.key); // eslint-disable-line no-process-env

const inspect = json => console.log(require('util').inspect(json, { depth: null }));

steam.others.resolve('id/DimGG/').then(async id => {
	console.log('resolve');
	console.log(id);

	console.log('getAppList');
	await steam.others.getAppList().then(inspect);

	console.log('getFeaturedCategories');
	await steam.others.getFeaturedCategories().then(inspect);
	console.log('getFeaturedGames');
	await steam.games.getFeaturedGames().then(inspect);

	console.log('getGameAchievements');
	await steam.games.getGameAchievements(730).then(inspect);
	console.log('getGameDetails');
	await steam.games.getGameDetails(730).then(inspect);
	console.log('getGameNews');
	await steam.games.getGameNews(730).then(inspect);
	console.log('getGamePlayers');
	await steam.games.getGamePlayers(730).then(inspect);
	console.log('getGameSchema');
	await steam.games.getGameSchema(730).then(inspect);

	console.log('getServers');
	await steam.others.getServers('216.52.148.47').then(inspect);

	console.log('getUserAchievements');
	await steam.users.getUserAchievements(id, 730).then(inspect);
	console.log('getUserBadges');
	await steam.users.getUserBadges(id).then(inspect);
	console.log('getUserBans');
	await steam.users.getUserBans(id).then(inspect);
	console.log('getUserFriends');
	await steam.users.getUserFriends(id).then(inspect);
	console.log('getUserGroups');
	await steam.users.getUserGroups(id).then(inspect);
	console.log('getUserLevel');
	await steam.users.getUserLevel(id).then(inspect);
	console.log('getUserOwnedGames');
	await steam.users.getUserOwnedGames(id).then(inspect);
	console.log('getUserRecentGames');
	await steam.users.getUserRecentGames(id).then(inspect);
	console.log('getUserServers');
	await steam.users.getUserServers(true).then(inspect);
	console.log('getUserStats');
	await steam.users.getUserStats(id, 730).then(inspect);
	console.log('getUserSummary');
	await steam.users.getUserSummary(id).then(inspect);
}).catch(inspect);

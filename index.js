require('dotenv').config()
const { BOT_TOKEN } = process.env;
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters')
const weatherService = require('./weather');

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`
Hello!
Enter city name:
`));

bot.on(message('text'), async (ctx) => {
	const city = ctx.message.text;

	try {
		const weather = await weatherService.getWeather(city);
		if (weather) {
			await ctx.reply(weather);
		} else {
			await ctx.reply('Failed to get the weather');
		}
	} catch (error) {
		console.error(error);
		await ctx.reply('An error occurred while requesting weather');
	}
});

bot.launch();

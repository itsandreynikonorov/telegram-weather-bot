const axios = require('axios');
const config = require('./config');

module.exports.getWeather = async (city) => {
	if (!city) {
		throw new Error('Не указан город');
	}

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.openWeatherMapKey}&units=metric`;

	try {
		const response = await axios.get(url);

		const data = response.data;

		if (!data || !data.main) {
			throw new Error('Неверный ответ от API');
		}

		const text = `${data.name}, ${data.sys.country}:
${data.weather[0].main}, ${data.main.temp}°C,
Humidity: ${data.main.humidity}%,
Wind speed: ${data.wind.speed} m/s.`;

		const result = {
			text: text,
		};

		return result;
	} catch (error) {
		console.error(error);
		return null;
	}
};

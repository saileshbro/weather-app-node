const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/297be17095dd97972db0608db9e87ca4/${latitude},${longitude}?units=si`;
    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            return callback("Unable to connect to weather service!", undefined);
        }
        if (body.err) {
            return callback(`Unable to find the location.`, undefined);
        }
        callback(undefined, `${body.currently.summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
    });
};
module.exports = forecast;
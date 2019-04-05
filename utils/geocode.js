const request = require("request");
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FpbGVzaGJybyIsImEiOiJjanR6ZDBrOHkwOWoxNDRyeHF4cDU1YThsIn0.aGVVutdTTEijQO60csVvBA`;
    request({
            url,
            json: true
        },
        (err, {
            body
        } = {}) => {
            if (err) {
                return callback("Unable to connect to location services!", undefined);
            }
            if (body.features.length === 0) {
                return callback(
                    "Unable to find location. Try another search.",
                    undefined
                );
            }
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    );
};


module.exports = geoCode;
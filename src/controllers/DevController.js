const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray= require ('../utils/ParseStringAsArray');

module.exports = {

    

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);

    },
    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        //Evitando duplicidade de cadastro-->
        if (!dev) {
            const Apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, bio, avatar_url } = Apiresponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location

            });

        }



        return response.json(dev);
    }

};

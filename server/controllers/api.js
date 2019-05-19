const axios = require('axios');

class APIController {
  static getListOfProvinces(req, res, next) {
    axios({
      method: 'GET',
      url: 'https://api.rajaongkir.com/starter/province',
      headers: { key: process.env.RAJAONGKIR_API_KEY },
    })
      .then(({ data }) => {
        const results = data.rajaongkir.results.map(province => `${province.province}`);
        res.status(200).json(results);
      })
      .catch((error) => {
        next(error);
      });
  };

  static getListOfCities(req, res, next) {
    const { province } = req.query;
    console.log(req.query);

    axios({
      method: 'GET',
      url: `https://api.rajaongkir.com/starter/city?province=${province}`,
      headers: { key: process.env.RAJAONGKIR_API_KEY },
    })
      .then(({ data }) => {
        const results = data.rajaongkir.results.map((city) => `${city.city_id}|${city.city_name}`);
        res.json(results);
      })
      .catch((error) => {
        next(error);
      });
  };

  static postRequestDeliveryCost(req, res, next) {
    const { 
      destination,
    } =  req.body;

    axios({
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: { key: process.env.RAJAONGKIR_API_KEY },
      data: {
        origin: 153,
        destination,
        courier: 'jne',
        weight: 1000,
      },
    })
      .then(({ data }) => {
        
        const costs = data.rajaongkir.results[0].costs
        costs.sort((a, b) => {
          return b.cost[0].value - a.cost[0].value
        });
        res.status(200).json(costs[0].cost[0])
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = APIController;
